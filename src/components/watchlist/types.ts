import { Stock } from "@/types/stock";

export interface WatchlistItemProps {
  stock: Stock;
  onRemove: (symbol: string) => void;
  onSelect?: (stock: Stock) => void;
}

export interface WatchlistProps {
  onSelectStock?: (stock: Stock) => void;
}
