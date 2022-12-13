import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderTypeSlice = createSlice({
  name: 'orderType',
  initialState: null,
  reducers: {
    setOrderType: (state, action: PayloadAction<string>) => action.payload
  },
})

export const {setOrderType} = orderTypeSlice.actions
export default orderTypeSlice.reducer
