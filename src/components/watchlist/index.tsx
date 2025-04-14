"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { WatchlistItem } from "./watchlist-item";
import { removeFromWatchlist } from "@/store/features/watchlist/watchlistSlice";
import type { WatchlistProps } from "./types";
import { AppDispatch } from "@/store";

export default function Watchlist({ onSelectStock }: WatchlistProps) {
  const stocks = useSelector((state: RootState) => state.watchlist.stocks);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (symbol: string) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Watchlist</h2>
      {stocks.length === 0 ? (
        <p className="text-black">No stocks in watchlist</p>
      ) : (
        <ul className="space-y-2">
          {stocks.map((stock) => (
            <WatchlistItem
              key={stock.symbol}
              stock={stock}
              onRemove={handleRemove}
              onSelect={onSelectStock}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
