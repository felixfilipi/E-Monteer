import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const acceptOrderSlice = createSlice({
  name: 'acceptOrder',
  initialState: false,
  reducers: {
    setAcceptOrder: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setAcceptOrder} = acceptOrderSlice.actions
export default acceptOrderSlice.reducer
