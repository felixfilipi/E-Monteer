import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { prisma } from './db';

export type Customer = Prisma.CustomerGetPayload<{
  include: {
    refresh_token: false;
  }
}>

export type Mechanic = Prisma.MechanicGetPayload<{
  include: {
    refresh_token: false;
  }
}>

export type Owner = Prisma.OwnerGetPayload<{}>

export async function find_user_by_email_or_phone( email? : string, phone? : string){

  let data : any = null;
  let role: string = 'customer';
  
  data = await prisma.customer.findMany({
    where:{
       OR:[
        {
          email: email,
        },
        {
          phone: phone,
        }
       ],
    },
  });

  if(data === null){
    data = await prisma.mechanic.findMany({
      where:{
        OR:[
          {
            email : email,
          },
          {
            phone: phone,
          }
        ]
      },
    });
    role = 'mechanic'
  }

  if(data === null){
    data = await prisma.owner.findUnique({
      where:{
        email : email,
      },
    });
    role = 'owner'
  }

  return { role, data }
}

export async function find_user_by_email_phone(email : string){

  let data : any = null;
  let role: string = 'customer';
  
  data = await prisma.customer.findMany({
    where:{
       OR:[
        {
          email: email,
        },
        {
          phone: email,
        }
       ],
    },
  });

  if(data === null){
    data = await prisma.mechanic.findMany({
      where:{
        OR:[
          {
            email : email,
          },
          {
            phone: email,
          }
        ]
      },
    });
    role = 'mechanic'
  }

  if(data === null){
    data = await prisma.owner.findUnique({
      where:{
        email : email,
      },
    });
    role = 'owner'
  }

  return { role, data }
}

export function create_user_by_email_password(role : string, user : Customer | Mechanic | Owner){
  if(role === 'customer'){ 
    (user as Customer).password = bcrypt.hashSync((user as Customer).password, 12);
    return prisma.customer.create({
      data: (user as Customer),
    });
  }else if(role === 'mechanic'){
    (user as Mechanic).password = bcrypt.hashSync((user as Mechanic).password, 12);
    return prisma.mechanic.create({
      data: (user as Mechanic),
    });
  }else if(role === 'owner'){
    (user as Owner).password = bcrypt.hashSync((user as Owner).password, 12);
    return prisma.owner.create({
      data: (user as Owner),
    })
  }else{
    console.log("Rule not found in function create_user");
  }
};

export function find_user_by_id(role : string, id : string){
  if(role === 'customer'){
    return prisma.customer.findUnique({
      where:{
        id : id,
      }
    })
  }else if(role === 'mechanic'){
    return prisma.mechanic.findUnique({
      where:{
        id: id,
      }
    })
  }else if(role === 'owner'){
    return prisma.owner.findUnique({
      where:{
        id: id,
      }
    })
  }else{
    console.log("Rule not found in function find_user_by_id");
  }
};
