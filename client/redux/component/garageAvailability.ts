import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const garageAvailabilitySlice = createSlice({
  name: 'garageAvailability',
  initialState: false,
  reducers: {
    setGarageAvailability: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setGarageAvailability} = garageAvailabilitySlice.actions
export default garageAvailabilitySlice.reducer
