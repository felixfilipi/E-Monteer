import { Request, Response } from 'express';
import { AuthRequest } from "../types/index";
import { getErrorMessage } from '../utils/errors.util';
import * as authServices from '../services/auth.service';
import bcrypt from 'bcrypt';
import { find_user_by_email_or_phone, find_user_by_email_phone, find_user_by_id, find_user_role_by_id } from '../models/user.models';
import { delete_refresh_token, find_refresh_token_by_id, revoke_token } from '../models/auth.models';
import { hashToken } from '../utils/hashToken';
import dotenv from 'dotenv';
import { prisma } from '../models/db';

dotenv.config({ path: '../../.env' });
/*  -------------------------------------------
*   function                      : returnType
*   -------------------------------------------
*   find_user_by_email_phone      : JSON       
*   find_user_by_email_or_phone   : JSON
*   -------------------------------------------
*/

export const Login = async (req: Request, res: Response) => {
  try{    
    const { email, password } = req.body;
    if(!email || !password){
      res.status(400);
      throw new Error('Email or Password is missing');
    };

    const db_user = await find_user_by_email_phone(email);
    if(!db_user.data){
      res.status(403);
      throw new Error('Invalid login credential.');
    }

    const validPassword = await bcrypt.compare(password, db_user.data[0].password);
    if(!validPassword){
      res.status(403);
      throw new Error('Invalid login credential');
    };

    const token = await authServices.addToken(db_user);
    res.json(token);

  }catch(err){
    return res.status(500).send(getErrorMessage(err));
  }
}

export const Register = async (req: Request, res: Response) => {
  try{
    const { email, phone, cust_name, mech_name } = req.body;
    if(!email){
      res.status(400);
      throw new Error('Email is Missing');
    };

    if(!phone){
      res.status(400);
      throw new Error('Phone is Missing');
    };

    let { role, data } = await find_user_by_email_or_phone(email, phone);
    cust_name !== undefined ? role = 'customer' : mech_name !== undefined ? role = 'mechanic' : 'owner';

    if(data.some((item : any) => item.email === email)){
      res.status(400);
      throw new Error('Email already in use.');
    }else if(data.some((item : any) => item.phone === phone)){
      res.status(400);
      throw new Error('Phone already in use.');
    };

    const token = await authServices.Register(role, req.body);
    
    res.json(token)

  }catch(err){
    return res.status(500).send(getErrorMessage(err));
  }
}

export const RefreshToken = async (req : AuthRequest, res : Response) => {
  try{
    const { jwtId, jti } = req.payload;
    const { refreshToken } = req.body;
    
    const savedRefreshToken = await find_refresh_token_by_id(jti);
    if(!savedRefreshToken || savedRefreshToken.revoked === true){
      res.status(400);
      throw new Error('Refresh Token not exist');
    };

    const hashedToken = hashToken(refreshToken);
    if(hashedToken !== savedRefreshToken.hashedToken){
      res.status(400);
      throw new Error('Unauthorized');
    }

    const role : string | null = await find_user_role_by_id(jwtId);
    if(role === null){
      res.status(403);
      throw new Error('Role not found');
    }

    const db_user = await find_user_by_id(role ,jwtId);
    
    if(!db_user){
      res.status(400);
      throw new Error('Unauthorized');
    };

    await delete_refresh_token(savedRefreshToken.id);

    let data = db_user;   // The login interface require var named data | alias of data. 
    
    const token = await authServices.addToken({ role, data });
    res.json(token);
    
  }catch(err){
    return res.status(500).send(getErrorMessage(err));
  }
}

export const RevokeToken = async (req : Request, res : Response) => {

  try{
    const { id } = req.body;
    const role : string | null = await find_user_role_by_id(id);
    if( role === null){
      throw new Error('User not found');
    };

    await revoke_token(role, id);
    res.json({ message: `Tokens revoked for user with id ${id}`});
  }catch(err){
    return res.status(500).send(getErrorMessage(err));
  }
}
