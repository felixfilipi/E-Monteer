import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const costListAppSlice = createSlice({
  name: 'costListApp',
  initialState: [
    {
      id:3,
      description:['Perjalanan', 'Ganti Aki'],
      quantity:[1.8, 1],
      price:[8000, 200000]
    },
    {
      id:2,
      description:['Perjalanan', 'Tambal Ban Bocor', 'Isi Bensin'],
      quantity:[2.2, 1, 2],
      price:[8000, 20000, 13000]
    },
    {
      id:1,
      description:['Perjalanan', 'Tambal ban', 'Perbaikan busi'],
      quantity:[1.57, 1, 1],
      price:[8000, 15000, 75000]
    },
  ],
  reducers: {
    setCostListApp: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setCostListApp} = costListAppSlice.actions
export default costListAppSlice.reducer
