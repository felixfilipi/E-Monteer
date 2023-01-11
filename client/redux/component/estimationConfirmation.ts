import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const estimationConfirmationSlice = createSlice({
  name: 'estimationConfirmation',
  initialState: false,
  reducers: {
    setEstimationConfirmation: (state, action: PayloadAction<boolean>) => action.payload
  },
})

export const {setEstimationConfirmation} = estimationConfirmationSlice.actions
export default estimationConfirmationSlice.reducer
