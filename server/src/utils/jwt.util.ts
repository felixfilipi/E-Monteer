import * as jwt from 'jsonwebtoken';
import { Customer, Owner, Mechanic } from '../models/user.models';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export function generateAccessToken(user : Customer | Owner | Mechanic){
  return jwt.sign({ cust_id: user.id }, 
    String(process.env.JWT_SECRET_KEY),
    {expiresIn: '5m'});
}

export function generateRefreshToken(user : Customer | Owner | Mechanic ,jti : string){
  return jwt.sign({
    jwtId:user.id,
    jti
  }, String(process.env.JWT_REFRESH_KEY), { 
    expiresIn: '8h',
  });
}

export function generateTokens(jti : string, user : Customer | Owner | Mechanic){
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);
  return{
    accessToken, refreshToken,
  };
}
