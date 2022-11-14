import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: 'both',
  reducers: {
    setVehicle: (state, action: PayloadAction<string>) => action.payload
  },
})

export const {setVehicle} = vehicleSlice.actions
export default vehicleSlice.reducer
