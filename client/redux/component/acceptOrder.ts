import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const acceptOrderSlice = createSlice({
  name: 'acceptOrder',
  initialState: {acceptOrder: false, id:null},
  reducers: {
    setAcceptOrder: (state, action: PayloadAction<{acceptOrder: boolean, id: number}>) => action.payload
  },
})

export const {setAcceptOrder} = acceptOrderSlice.actions
export default acceptOrderSlice.reducer
