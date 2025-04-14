"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResults,
  setLoading,
  setError,
  selectStock,
} from "@/store/features/stocks/stocksSlice";
import { searchStocks } from "@/lib/api/alphaVantage";
import { FiSearch } from "react-icons/fi";
import { validateSearchQuery, formatSearchQuery } from "./utils";
import type { StockSearchProps } from "./types";
import { AppDispatch, RootState } from "@/store";

export default function StockSearch({ onSearch }: StockSearchProps) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.stocks);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSearchQuery({ query })) {
      dispatch(setError("Please write a valid query"));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const formattedQuery = formatSearchQuery(query);
      const results = await searchStocks(formattedQuery);

      if (!results.length) {
        dispatch(
          setError("Sorry we cannot find that stock, pleae enter a valid name")
        );
        dispatch(setSearchResults([]));
        return;
      }

      dispatch(setSearchResults(results));
      onSearch?.(formattedQuery);

      // Selecting first stock by default
      dispatch(selectStock(results[0].symbol));
    } catch (error) {
      console.error(error);
      dispatch(setError("Failed to search, please retry"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Search Stocks</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stock (e.g Tesla, Apple)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500 border-gray-300"
            aria-label="Stock search"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!validateSearchQuery({ query })}
        >
          Search
        </button>
      </form>
    </div>
  );
}
