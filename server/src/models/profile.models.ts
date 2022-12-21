import { prisma } from './db';
import { IProfileGarage, IProfileOwner, IProfileCustomer, IProfileMechanic } from '../types/profile.types';
import { find_user_by_email_or_phone } from './user.models';

export async function update_profile(role: string, id: string, data: IProfileCustomer | IProfileMechanic | IProfileOwner, dataGarage? : IProfileGarage){
  
  const data_avail = await find_user_by_email_or_phone(data.email, data.phone_number);
  
  if(data_avail){
    return false
  }
  
  if(role === 'customer'){
   await prisma.customer.update({
      where:{
        id : id,
      },
      data:(data as IProfileCustomer)
    })

    return true;

  }else if(role === 'mechanic'){
    await prisma.mechanic.update({
      where:{
        id: id,
      },
      data:(data as IProfileMechanic)
    })

    return true;
  }else if(role === 'owner'){

    if( dataGarage !== undefined ){
    
      const data_owner = await prisma.owner.update({
        where:{
          id: id,
        },
        data:(data as IProfileOwner)
      })

      const data_garage = await prisma.garage.update({
        where:{
          id: id,
        },
        data: {
          photoUrl: dataGarage.photoUrl,
          openHour: dataGarage.openHour,
          openDay: dataGarage.openDay,
          site: dataGarage.site,
          latitude: dataGarage.latitude,
          longitude: dataGarage.longitude,
          speciality: dataGarage.speciality,
        }
      })
    
      if(data_owner && data_garage){
        return true;
      }else{
        return false
      }
    }else{
      return false
    }

  }else{
    return false;
  }
}
