import { create_user_by_email_password } from '../models/user.models';
import { Customer, Mechanic, Owner } from '../models/user.models';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../utils/jwt.util';
import { add_refresh_token } from '../models/auth.models';
import { IServiceAddToken } from '../types/auth.types';

export async function Register(role: string, user: Customer | Mechanic | Owner){
  const createdUser = await create_user_by_email_password(role, user)
  const jti = uuidv4()
  const { accessToken, refreshToken } = generateTokens(jti, createdUser!);
  await add_refresh_token(
    {
      role:role, 
      jti: jti, 
      refreshToken: refreshToken, 
      id: createdUser!.id
    }
  )
  return {accessToken, refreshToken}
};

export async function addToken(db_user: IServiceAddToken){
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(jti, db_user.data);
  await add_refresh_token(
    {
      role: db_user.role,
      jti: jti,
      refreshToken: refreshToken,
      id: db_user.data.id
    }
  )

  return {accessToken, refreshToken}
}
