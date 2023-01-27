import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const mechLocationSlice = createSlice({
  name: 'mechLocation',
  initialState: {
    latitude:0, 
    longitude:0
  },
  reducers: {
    setMechLocation: (state, action: PayloadAction<any>) => action.payload
  },
})

export const {setMechLocation} = mechLocationSlice.actions
export default mechLocationSlice.reducer
