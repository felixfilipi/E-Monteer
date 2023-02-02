import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatTargetSlice = createSlice({
  name: 'chatTarget',
  initialState: {
    roomTopic: null,
    targetId: null,
  },
  reducers: {
    setChatTarget: (state, action: PayloadAction<{roomTopic: number, targetId: number}>) => action.payload
  },
})

export const {setChatTarget} = chatTargetSlice.actions
export default chatTargetSlice.reducer
