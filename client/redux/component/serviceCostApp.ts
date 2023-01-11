import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const serviceCostAppSlice = createSlice({
  name: 'serviceCostApp',
  initialState: 0,
  reducers: {
    setServiceCostApp: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setServiceCostApp} = serviceCostAppSlice.actions
export default serviceCostAppSlice.reducer
