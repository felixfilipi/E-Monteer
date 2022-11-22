import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const latitudeSlice = createSlice({
  name: 'latitude',
  initialState: 0,
  reducers: {
    setLatitude: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setLatitude} = latitudeSlice.actions
export default latitudeSlice.reducer
