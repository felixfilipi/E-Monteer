import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const doneOrderSlice = createSlice({
  name: 'doneOrder',
  initialState: false,
  reducers: {
    setDoneOrder: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setDoneOrder} = doneOrderSlice.actions
export default doneOrderSlice.reducer
