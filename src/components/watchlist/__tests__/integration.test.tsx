import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Watchlist from "../index";
import stocksReducer from "@/store/features/stocks/stocksSlice";
import watchlistReducer from "@/store/features/watchlist/watchlistSlice";
import { Stock } from "@/types/stock";

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      stocks: stocksReducer,
      watchlist: watchlistReducer,
    },
    preloadedState: initialState,
  });
};

const mockStock: Stock = {
  symbol: "AAPL",
  name: "Apple Inc",
  price: 150.0,
  change: 2.5,
  changePercent: 1.5,
  currency: "USD",
};

describe("Watchlist Integration", () => {
  it("add and remove stocks from watchlist", async () => {
    const store = createTestStore({
      watchlist: {
        stocks: [mockStock],
      },
    });

    render(
      <Provider store={store}>
        <Watchlist />
      </Provider>
    );

    // making sure its in watchlist
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc")).toBeInTheDocument();

    // removeing
    const removeButton = screen.getByTitle("Remove from watchlist");
    fireEvent.click(removeButton);

    // making sure its removed
    await waitFor(() => {
      expect(screen.queryByText("AAPL")).not.toBeInTheDocument();
    });

    // empty state message is shown
    expect(screen.getByText("No stocks in watchlist")).toBeInTheDocument();
  });
});
