import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderTimerSlice = createSlice({
  name: 'orderTimer',
  initialState: {stop: false, time:120},
  reducers: {
    setOrderTimer: (state, action: PayloadAction<{stop: boolean, time:number}>) => action.payload
  },
})

export const {setOrderTimer} = orderTimerSlice.actions
export default orderTimerSlice.reducer
