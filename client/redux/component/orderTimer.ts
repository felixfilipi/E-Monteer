import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderTimerSlice = createSlice({
  name: 'orderTimer',
  initialState: 120,
  reducers: {
    setOrderTimer: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setOrderTimer} = orderTimerSlice.actions
export default orderTimerSlice.reducer
