import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderFail',
  initialState: false,
  reducers: {
    setOrderFail: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setOrderFail} = orderSlice.actions
export default orderSlice.reducer
