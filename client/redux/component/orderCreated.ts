import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderCreatedSlice = createSlice({
  name: 'orderCreated',
  initialState: false,
  reducers: {
    setOrderCreated: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setOrderCreated} = orderCreatedSlice.actions
export default orderCreatedSlice.reducer
