import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const activeStatusSlice = createSlice({
  name: 'activeStatus',
  initialState: null,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<{role:string, id: number}>) => action.payload
  },
})

export const {setActiveStatus} = activeStatusSlice.actions
export default activeStatusSlice.reducer
