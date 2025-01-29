import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// List of tokens to fetch data for
const tokens = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'litecoin', symbol: 'LTC' },
  {id: 'binancecoin', symbol: 'BNB' },                      
];
const API_KEY = 'CG-Pd9barSNAVtBvNPYm8xkzJXp';

// ✅ Fetch historical data for all tokens
export const fetchAllHistoricalData = createAsyncThunk(
  'tokens/fetchAllHistoricalData',
  async (_, { rejectWithValue }) => {
    try {
      const data = {};

      const responses = await Promise.allSettled(
        tokens.map(async (token) => {
          try {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/${token.id}/market_chart?vs_currency=usd&days=30`,
              {
                headers: {
                  'x-cg-demo-api-key': API_KEY, // ✅ Corrected header
                },
              }
            );

            if (!response.ok) throw new Error(`Failed ${token.id}: ${response.statusText}`);

            const result = await response.json();
            if (!result.prices) throw new Error(`No data for ${token.id}`);

            data[token.symbol] = result.prices.map(([timestamp, price]) => ({
              date: new Date(timestamp),
              realPrice: price,
            }));
          } catch (error) {
            console.error(`Error fetching ${token.id}:`, error.message);
          }
        })
      );

      if (Object.keys(data).length === 0) throw new Error('No token data retrieved');

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tokenSlice = createSlice({
  name: 'tokens',
  initialState: {
    data: {}, // { BTC: [...], ETH: [...], etc. }
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllHistoricalData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllHistoricalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tokenSlice.reducer;