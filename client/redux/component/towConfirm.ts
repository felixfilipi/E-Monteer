import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const towConfirmSlice = createSlice({
  name: 'towConfirm',
  initialState: {sendConfirm: false, receiveConfirm: null},
  reducers: {
    setTowConfirm: (state, action: PayloadAction<{sendConfirm: boolean, receiveConfirm:boolean}>) => action.payload
  },
})

export const {setTowConfirm} = towConfirmSlice.actions
export default towConfirmSlice.reducer
