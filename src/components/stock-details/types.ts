import { Stock, HistoricalDataPoint } from "@/types/stock";

export interface StockDetailsProps {
  stock?: Stock;
  historicalData?: HistoricalDataPoint[];
  onAddToWatchlist?: (stock: Stock) => void;
}

export interface StockPriceProps {
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export interface StockChartProps {
  data: HistoricalDataPoint[];
}
