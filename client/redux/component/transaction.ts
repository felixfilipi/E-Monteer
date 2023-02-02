import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: [
    {
      id:3,
      cust_id:13,
      mechanicId:6,
      garageId: 2,
      roomTopic:3,
      towingId:null,
      fixId:3,
      handle_type:'Motor',
      trans_start_dt:'1/18/2023, 17:05:04 PM',
      trans_end_dt:'1/18/2023, 17:31:14 PM',
      pickup_latitude:-7.93857,
      pickup_longitude:112.63850,
      pickup_address:'Kolese Santo Yusup, Jl Simpang Borobudur No 1, Malang, Jawa Timur',
      service_cost: 214400,
      customer_paid:250000,
      rating:null,
    },
    {
      id:2,
      cust_id:13,
      mechanicId:5,
      garageId: 3,
      roomTopic:2,
      towingId:null,
      fixId:2,
      handle_type:'Mobil',
      trans_start_dt:'1/20/2023, 08:15:28 AM',
      trans_end_dt:'1/20/2023, 09:10:20 AM',
      pickup_latitude:-7.90855,
      pickup_longitude:112.62822,
      pickup_address:'Perum Tirtasani Royal Park 18/8, Karangploso, Malang',
      service_cost: 63600,
      customer_paid:70000,
      rating:4,
    },
    {
      id:1,
      cust_id: 13,
      mechanicId:4,
      garageId: 1,
      roomTopic:1,
      towingId:null,
      fixId:1,
      handle_type:'Mobil',
      trans_start_dt:'1/23/2023, 11:25:44 AM',
      trans_end_dt:'1/23/2023, 12:30:24 PM',
      pickup_latitude:-7.93981,
      pickup_longitude:112.68035,
      pickup_address:'Jl Araya Mansion No 8, Binus Malang, Jawa Timur',
      service_cost: 190200,
      customer_paid:200000,
      rating:null,
    },
  ],
  reducers: {
    setTransaction: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setTransaction} = transactionSlice.actions
export default transactionSlice.reducer
