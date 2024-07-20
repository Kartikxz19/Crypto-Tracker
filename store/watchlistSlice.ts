import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchlistState {
  coins: string[];
}

const initialState: WatchlistState = {
  coins: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<string>) => {
      if (!state.coins.includes(action.payload)) {
        state.coins.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter(coin => coin !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;