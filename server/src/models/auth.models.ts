import { prisma } from './db';
import { hashToken } from '../utils/hashToken';
import { IModelRefreshToken } from '../types/auth.types';

export function add_refresh_token({ role, jti, refreshToken, id } : IModelRefreshToken){
  if(role === 'customer'){
    return prisma.refreshToken.create({
      data:{
        id: jti,
        hashedToken: hashToken(refreshToken),
        cust_id: id,
      }
    })
  }else if(role === 'mechanic'){
    return prisma.refreshToken.create({
      data:{
        id: jti,
        hashedToken: hashToken(refreshToken),
        mech_id: id,
      }
    })
  }else if(role === 'owner'){
    return prisma.refreshToken.create({
      data:{
        id: jti,
        hashedToken: hashToken(refreshToken),
        owner_id: id,
      }
    })
  }else{
    console.log('Role not found in function add_refresh_token');
  }
}

export function find_refresh_token_by_id(token_id : string){
  return prisma.refreshToken.findUnique({
    where:{
      id: token_id,
    }
  });
};

export function delete_refresh_token(token_id: string){
  return prisma.refreshToken.update({
    where:{
      id:token_id,
    },
    data:{
      revoked: true
    }
  });
}

export function revoke_token(role: string, id: string){
  if(role === 'customer'){
    return prisma.refreshToken.updateMany({
      where:{
        cust_id: id,
      },
      data:{
        revoked: true,
      }
    })
  }else if(role === 'mechanic'){
    return prisma.refreshToken.updateMany({
      where:{
        mech_id: id,
      },
      data:{
        revoked: true,
      }
    })
  }else if(role === 'owner'){
    return prisma.refreshToken.updateMany({
      where:{
        owner_id: id,
      },
      data:{
        revoked: true,
      }
    })
  }else{
    console.log('Role not found in function revoke_token')
  }
};
  
