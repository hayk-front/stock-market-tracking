import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import StockSearch from "../index";
import stocksReducer from "@/store/features/stocks/stocksSlice";
import watchlistReducer from "@/store/features/watchlist/watchlistSlice";
import { searchStocks } from "@/lib/api/alphaVantage";

// mock API
jest.mock("@/lib/api/alphaVantage", () => ({
  searchStocks: jest.fn(),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      stocks: stocksReducer,
      watchlist: watchlistReducer,
    },
  });
};

describe("StockSearch", () => {
  it("shows error message when no results are found", async () => {
    const store = createTestStore();
    (searchStocks as jest.Mock).mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <StockSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      "Search stock (e.g Tesla, Apple)"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "invalidstock" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Sorry we cannot find that stock, pleae enter a valid name"
        )
      ).toBeInTheDocument();
    });
  });

  it("disables search button when input is empty", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <StockSearch />
      </Provider>
    );

    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeDisabled();
  });

  it("enables search button when input has valid text", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <StockSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      "Search stock (e.g Tesla, Apple)"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "Apple" } });
    expect(searchButton).not.toBeDisabled();
  });
});
