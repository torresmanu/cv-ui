// slices/kpiDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { KPIService } from '../../services/KPIService';

export const fetchKpiData = createAsyncThunk(
  'kpiData/fetchKpiData',
  async ({ startDate, endDate }) => {
    const response = await KPIService.getFailureStats(startDate, endDate);
    return response;
  }
);

const kpiDataSlice = createSlice({
  name: 'kpiData',
  initialState: {
    calibrationData: {},
    trustworthyData: {},
    processingFailsData: {},
    discardedData: {},
    completedEvaluations: {},
    successfulTasks: {},
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKpiData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchKpiData.fulfilled, (state, action) => { 
        const data = action.payload;
        state.calibrationData = data.calibrations || {};
        state.trustworthyData = data.trustworthy_task || {};
        state.processingFailsData = data.processing_fails || {};
        state.discardedData = data.discarded || {};
        state.completedEvaluations = data.completed_evaluations || "-";
        state.successfulTasks = data.successful_tasks || "-";
        state.isLoading = false;
      })
      .addCase(fetchKpiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default kpiDataSlice.reducer;