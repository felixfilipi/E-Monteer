import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: 0,
  reducers: {
    setNavbar: (state, action: PayloadAction<number>) => action.payload
  },
})

export const {setNavbar} = navbarSlice.actions
export default navbarSlice.reducer
