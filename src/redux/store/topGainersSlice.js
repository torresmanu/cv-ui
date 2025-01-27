import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const fetchTopGainers = createAsyncThunk(
  'topGainers/fetchTopGainers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const data = await response.json();

      // Sort tokens by highest price change percentage
      const topGainers = data
        .filter((coin) => coin.price_change_percentage_24h > 0) // Only positive gainers
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 3) // Take top 3 gainers
        .map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          change: coin.price_change_percentage_24h.toFixed(2),
        }));

      return topGainers;
    } catch (error) {
      console.error('Fetch Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const topGainersSlice = createSlice({
  name: 'topGainers',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopGainers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopGainers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTopGainers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch top gainers data';
      });
  },
});

export default topGainersSlice.reducer;