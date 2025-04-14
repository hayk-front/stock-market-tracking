"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addToWatchlist } from "@/store/features/watchlist/watchlistSlice";
import { FiStar } from "react-icons/fi";
import { StockPrice } from "./stock-price";
import { StockChart } from "./stock-chart";
import type { StockDetailsProps } from "./types";

export default function StockDetails({ onAddToWatchlist }: StockDetailsProps) {
  const { selectedStock, historicalData } = useSelector(
    (state: RootState) => state.stocks
  );
  const watchlist = useSelector((state: RootState) => state.watchlist.stocks);
  const dispatch = useDispatch();

  const handleAddToWatchlist = () => {
    if (selectedStock) {
      dispatch(addToWatchlist(selectedStock));
      onAddToWatchlist?.(selectedStock);
    }
  };

  if (!selectedStock) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Stock Details</h2>
        <p className="text-black">Search stock to view the details</p>
      </div>
    );
  }

  const isInWatchlist = watchlist.some(
    (stock) => stock.symbol === selectedStock.symbol
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-black">
            {selectedStock.symbol}
          </h2>
          <p className="text-black">{selectedStock.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <StockPrice
            price={selectedStock.price}
            change={selectedStock.change}
            changePercent={selectedStock.changePercent}
            currency={selectedStock.currency}
          />
          {!isInWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              className="p-2 text-gray-400 hover:text-yellow-500"
              title="Add to watchlist"
              aria-label="Add to watchlist"
            >
              <FiStar size={24} />
            </button>
          )}
        </div>
      </div>

      <StockChart data={historicalData} />
    </div>
  );
}
