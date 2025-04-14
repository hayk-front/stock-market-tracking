import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock } from "@/types/stock";

interface WatchlistState {
  stocks: Stock[];
}

const initialState: WatchlistState = {
  stocks: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Stock>) => {
      if (
        !state.stocks.some((stock) => stock.symbol === action.payload.symbol)
      ) {
        state.stocks.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.stocks = state.stocks.filter(
        (stock) => stock.symbol !== action.payload
      );
    },
    clearWatchlist: (state) => {
      state.stocks = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
