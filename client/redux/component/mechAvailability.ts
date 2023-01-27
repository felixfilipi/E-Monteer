import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const mechAvailabilitySlice = createSlice({
  name: 'mechAvailability',
  initialState: false,
  reducers: {
    setMechAvailability: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setMechAvailability} = mechAvailabilitySlice.actions
export default mechAvailabilitySlice.reducer
