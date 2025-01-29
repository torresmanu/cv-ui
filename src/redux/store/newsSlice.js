import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Free API for crypto news (example: CoinGecko)
const API_URL = 'https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=447d072c2f1a41b481bb2c74e78eb945'; 

export const fetchCryptoNews = createAsyncThunk(
  'news/fetchCryptoNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      return data.articles.slice(0, 5).map((article) => ({
        title: article.title,
        description: article.description,
        imageUrl: article.urlToImage || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', // Fallback image
        newsLink: article.url,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;