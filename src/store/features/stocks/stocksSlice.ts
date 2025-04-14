import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Stock, HistoricalDataPoint } from "@/types/stock";
import { getStockQuote, getHistoricalData } from "@/lib/api/alphaVantage";

interface StocksState {
  searchResults: Stock[];
  selectedStock: Stock | null;
  historicalData: HistoricalDataPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  searchResults: [],
  selectedStock: null,
  historicalData: [],
  loading: false,
  error: null,
};

export const selectStock = createAsyncThunk(
  "stocks/selectStock",
  async (symbol: string, { rejectWithValue }) => {
    try {
      const [quote, historical] = await Promise.all([
        getStockQuote(symbol),
        getHistoricalData(symbol),
      ]);
      return { quote, historical };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch stock data");
    }
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Stock[]>) => {
      state.searchResults = action.payload;
    },
    setSelectedStock: (state, action: PayloadAction<Stock | null>) => {
      state.selectedStock = action.payload;
    },
    setHistoricalData: (
      state,
      action: PayloadAction<HistoricalDataPoint[]>
    ) => {
      state.historicalData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectStock.fulfilled, (state, action) => {
        state.selectedStock = action.payload.quote;
        state.historicalData = action.payload.historical;
        state.loading = false;
      })
      .addCase(selectStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchResults,
  setSelectedStock,
  setHistoricalData,
  setLoading,
  setError,
} = stocksSlice.actions;

export default stocksSlice.reducer;
