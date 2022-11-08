import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: false,
  reducers: {
    setDrawer: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setDrawer} = drawerSlice.actions
export default drawerSlice.reducer
