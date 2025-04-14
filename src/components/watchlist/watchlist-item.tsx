"use client";

import { FiX } from "react-icons/fi";
import type { WatchlistItemProps } from "./types";

export function WatchlistItem({
  stock,
  onRemove,
  onSelect,
}: WatchlistItemProps) {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
      <button onClick={() => onSelect?.(stock)} className="flex-1 text-left">
        <div className="font-medium text-black">{stock.symbol}</div>
        <div className="text-sm text-black">{stock.name}</div>
        <div className={`text-sm ${changeColor}`}>
          {isPositive ? "+" : ""}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </div>
      </button>
      <button
        onClick={() => onRemove(stock.symbol)}
        className="p-1 text-gray-400 hover:text-black"
        title="Remove from watchlist"
        aria-label="Remove from watchlist"
      >
        <FiX size={20} />
      </button>
    </li>
  );
}
