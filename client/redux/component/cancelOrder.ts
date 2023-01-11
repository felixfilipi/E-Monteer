import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cancelOrderSlice = createSlice({
  name: 'cancelOrder',
  initialState: false,
  reducers: {
    setCancelOrder: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setCancelOrder} = cancelOrderSlice.actions
export default cancelOrderSlice.reducer
