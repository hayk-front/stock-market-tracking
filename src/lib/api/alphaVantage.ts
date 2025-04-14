import axios from "axios";
import { Stock, HistoricalDataPoint } from "@/types/stock";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

const BASE_URL = "https://www.alphavantage.co/query";

interface SymbolSearchMatch {
  "1. symbol": string;
  "2. name": string;
  "8. currency": string;
}

interface SymbolSearchResponse {
  bestMatches: SymbolSearchMatch[];
}

interface GlobalQuote {
  "05. price": string;
  "09. change": string;
  "10. change percent": string;
  "08. currency": string;
}

interface GlobalQuoteResponse {
  "Global Quote": GlobalQuote;
}

interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface TimeSeriesResponse {
  [key: string]: {
    [date: string]: TimeSeriesData;
  };
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const searchStocks = async (query: string): Promise<Stock[]> => {
  try {
    const response = await api.get<SymbolSearchResponse>("", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: query,
      },
    });

    if (response.data.bestMatches) {
      return response.data.bestMatches.map((match) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        price: 0,
        change: 0,
        changePercent: 0,
        currency: match["8. currency"],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error searching stocks:", error);
    throw error;
  }
};

export const getStockQuote = async (symbol: string): Promise<Stock> => {
  try {
    const response = await api.get<GlobalQuoteResponse>("", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
      },
    });

    const quote = response.data["Global Quote"];
    return {
      symbol,
      name: "", // Geting this from the search endpoint
      price: parseFloat(quote["05. price"]),
      change: parseFloat(quote["09. change"]),
      changePercent: parseFloat(quote["10. change percent"]),
      currency: quote["08. currency"],
    };
  } catch (error) {
    console.error("Error getting stock quote:", error);
    throw error;
  }
};

export const getHistoricalData = async (
  symbol: string,
  interval: "daily" | "weekly" | "monthly" = "daily"
): Promise<HistoricalDataPoint[]> => {
  try {
    const response = await api.get<TimeSeriesResponse>("", {
      params: {
        function: `TIME_SERIES_${interval.toUpperCase()}`,
        symbol,
        outputsize: "compact",
      },
    });

    const timeSeriesKey = `Time Series (${
      interval.charAt(0).toUpperCase() + interval.slice(1)
    })`;
    const timeSeries = response.data[timeSeriesKey];

    return Object.entries(timeSeries).map(([date, data]) => ({
      date,
      open: parseFloat(data["1. open"]),
      high: parseFloat(data["2. high"]),
      low: parseFloat(data["3. low"]),
      close: parseFloat(data["4. close"]),
      volume: parseInt(data["5. volume"]),
    }));
  } catch (error) {
    console.error("Error getting historical data:", error);
    throw error;
  }
};
