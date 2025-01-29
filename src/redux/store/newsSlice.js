// ✅ Use CoinGecko API (No API Key Needed)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual CoinGecko API key
const API_URL = 'https://api.coingecko.com/api/v3/news';

export const fetchCryptoNews = createAsyncThunk(
  'news/fetchCryptoNews',
  async (_, { rejectWithValue }) => {
    try {

      const response = await fetch(`${API_URL}?page=1`, {
        headers: {
          'x-cg-api-key': API_KEY,
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const result = await response.json();

      if (!result || !result.data || !Array.isArray(result.data)) {
        throw new Error('Invalid API response format');
      }

      // ✅ Extract relevant news data
      return result.data.slice(0, 5).map((article) => ({
        id: article.id,
        title: article.title,
        description: article.description || 'No description available.',
        imageUrl:
          article.thumb_2x && article.thumb_2x !== 'missing_large.png'
            ? article.thumb_2x
            : 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', // Fallback image
        newsLink: article.url,
        author: article.author || 'Unknown',
        newsSite: article.news_site || 'Unknown',
        publishedAt: new Date(article.created_at * 1000).toLocaleString(), // Convert timestamp to readable format
      }));
    } catch (error) {
      console.error('Error fetching news:', error.message);
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