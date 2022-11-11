import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => action.payload
  },
})

export const {setSearch} = searchSlice.actions
export default searchSlice.reducer
