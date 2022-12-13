import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderFailSlice = createSlice({
  name: 'orderFail',
  initialState: false,
  reducers: {
    setOrderFail: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setOrderFail} = orderFailSlice.actions
export default orderFailSlice.reducer
