import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const longitudeSlice = createSlice({
  name: 'longitude',
  initialState: 0,
  reducers: {
    setLongitude: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setLongitude} = longitudeSlice.actions
export default longitudeSlice.reducer
