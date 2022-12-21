import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: '../../.env' });

export function isAuthenticated(req : Request, res: Response, next: NextFunction){
  const { refreshToken } = req.body;

  if(!refreshToken){
    res.status(401);
    throw new Error('Missing Refresh Token');
  }

  try{
    const payload : any = jwt.verify(refreshToken, String(process.env.JWT_REFRESH_KEY));
    req.payload = payload;
  }catch(err : any){
    res.status(401);
    if(err.name === 'TokenExpiredError'){
      throw new Error(err.name);
    }
    throw new Error('Unauthorized');
  };

  return next();
}
