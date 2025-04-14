import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./features/stocks/stocksSlice";
import watchlistReducer from "./features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    watchlist: watchlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
