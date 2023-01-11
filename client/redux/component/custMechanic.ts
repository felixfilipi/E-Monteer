import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const custMechanicSlice = createSlice({
  name: 'custMechanic',
  initialState: [],
  reducers: {
    setCustMechanic: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setCustMechanic} = custMechanicSlice.actions
export default custMechanicSlice.reducer
