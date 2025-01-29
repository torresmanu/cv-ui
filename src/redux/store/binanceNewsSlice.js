import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your CryptoPanic API Key (Get it for free)
const API_KEY = 'd24359ac53aab1781ecd260b043735096be589da'; 
const API_URL = `https://cryptopanic.com/api/free/v1/posts/?auth_token=${API_KEY}&public=true`;


export const fetchCryptoNews = createAsyncThunk(
  'cryptoNews/fetchCryptoNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();

      if (!data || !data.results) {
        throw new Error('No news found');
      }

      return data.results.slice(0, 10).map((article) => ({
        username: article.source.title || 'CryptoPanic',
        text: article.title,
        avatar: article.source.icon || 'https://cryptopanic.com/static/img/favicon/favicon-32x32.png',
        newsLink: article.url,
      }));
    } catch (error) {
      console.error('Fetch Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'cryptoNews',
  initialState: {
    data: [],
    status: 'idle',
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
        state.error = action.payload || 'Failed to fetch news data';
      });
  },
});

export default newsSlice.reducer;