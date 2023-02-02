import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: [
    {
      roomTopic: 1,
      cust_id: 13,
      mech_id:4,
      lastMessage: 'Baik, saya menuju kesana sekarang',
      last_date_time: '1/23/2023, 11:31:02 AM',
      signal_customer: 0,
    },
    {
      roomTopic: 2,
      cust_id: 13,
      mech_id:5,
      lastMessage: 'Okee, terima kasih ya mas',
      last_date_time: '1/20/2023, 09:10:20 AM',
      signal_customer: 1,
    },
    {
      roomTopic: 3,
      cust_id: 13,
      mech_id:6,
      lastMessage: 'Saya segera kesana mas',
      last_date_time: '1/18/2023, 17:10:39 PM',
      signal_customer: 0,
    },
  ],
  reducers: {
    setChatRoom: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setChatRoom} = chatRoomSlice.actions
export default chatRoomSlice.reducer
