import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as authServices from '../services/auth.service';
import bcrypt from 'bcrypt';
import { find_user_by_email_or_phone, find_user_by_email_phone } from '../models/user.models';

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

    const token = await authServices.Login(db_user);
    res.json(token);
    res.status(200).send('Register Success');

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
    res.status(200).send('Register Success');

  }catch(err){
    return res.status(500).send(getErrorMessage(err));
  }
}
