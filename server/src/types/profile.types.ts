export interface IProfileCustomer{
  cust_name : string,
  password: string,
  email: string,
  phone_number: string,
  address: string,
  photoUrl?: string
}

export interface IProfileMechanic{
  mech_name : string,
  password: string,
  email: string,
  phone_number: string,
  address: string,
  photoUrl: string,
  specialty: string,
}

export interface IProfileOwner{
  owner_name : string,
  phone_number: string,
  photoUrl: string,
  password: string,
  email: string,
}

export interface IProfileGarage{
  photoUrl: string,
  openHour: string,
  openDay: string,
  site: string,
  latitude: number,
  longitude: number,
  speciality: string,
}
