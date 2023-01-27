import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const custLocationSlice = createSlice({
  name: 'custLocation',
  initialState: {
    latitude:0, 
    longitude:0
  },
  reducers: {
    setCustLocation: (state, action: PayloadAction<any>) => action.payload
  },
})

export const {setCustLocation} = custLocationSlice.actions
export default custLocationSlice.reducer
