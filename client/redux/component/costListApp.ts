import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const costListAppSlice = createSlice({
  name: 'costListApp',
  initialState: [],
  reducers: {
    setCostListApp: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setCostListApp} = costListAppSlice.actions
export default costListAppSlice.reducer
