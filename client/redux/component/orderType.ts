import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderTypeSlice = createSlice({
  name: 'orderType',
  initialState:null,
  reducers: {
    setOrderType: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setOrderType} = orderTypeSlice.actions
export default orderTypeSlice.reducer
