import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// List of tokens to fetch data for
const tokens = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'litecoin', symbol: 'LTC' },
  {id: 'binancecoin', symbol: 'BNB' },                      
];

// Fetch historical data for all tokens
export const fetchAllHistoricalData = createAsyncThunk(
  'tokens/fetchAllHistoricalData',
  async () => {
    const data = {};
    await Promise.all(
      tokens.map(async (token) => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${token.id}/market_chart?vs_currency=usd&days=30`
        );
        const result = await response.json();
        data[token.symbol] = result.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp),
          realPrice: price,
        }));
      })
    );
    return data;
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