import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: 'Customer',
  reducers: {
    setRole: (state, action: PayloadAction<string>) => action.payload
  },
})

export const {setRole} = roleSlice.actions
export default roleSlice.reducer
