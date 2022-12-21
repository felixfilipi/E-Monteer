import { Customer, Mechanic, Owner } from "../models/user.models";

export interface IModelRefreshToken{
  role: string,
  jti: string,
  refreshToken: string,
  id: string,
}

export interface IServiceAddToken{
  role: string,
  data: Customer | Mechanic | Owner,
}
