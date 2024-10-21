import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: new Date(),
  endDate: new Date()
};

const dateFilterSlice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    }
  }
});

export const { setStartDate, setEndDate } = dateFilterSlice.actions;
export default dateFilterSlice.reducer;