import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const acceptCostListSlice = createSlice({
  name: 'acceptCostList',
  initialState: {acceptCostList: null, id:null},
  reducers: {
    setAcceptCostList: (state, action: PayloadAction<{acceptCostList: boolean, id: number}>) => action.payload
  },
})

export const {setAcceptCostList} = acceptCostListSlice.actions
export default acceptCostListSlice.reducer
