import { Request } from 'express';

export interface AuthRequest extends Request{
  payload? : any
}

declare module 'express'{
  interface Request{
    payload? : any;
  }
}
