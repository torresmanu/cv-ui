import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL for Alternative.me
const API_BASE_URL = 'https://api.alternative.me/fng/';

// Async thunk to fetch sentiment data
export const fetchSentimentData = createAsyncThunk(
  'sentiment/fetchSentimentData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const data = await response.json();
      return data.data.map((entry) => ({
        value: parseInt(entry.value, 10), // Convert value to integer
        classification: entry.value_classification,
        timestamp: entry.timestamp,
      }));
    } catch (error) {
      console.error('Fetch Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const sentimentSlice = createSlice({
  name: 'sentiment',
  initialState: {
    data: [], // Array to store fear and greed data
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message, if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentimentData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSentimentData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSentimentData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch sentiment data';
      });
  },
});

export default sentimentSlice.reducer;