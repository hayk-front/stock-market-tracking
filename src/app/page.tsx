import { Suspense } from "react";
import StockSearch from "@/components/stock-search";
import Watchlist from "@/components/watchlist";
import StockDetails from "@/components/stock-details";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Realtime Stock tracking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StockSearch />
            <Suspense fallback={<div>Loading details....</div>}>
              <StockDetails />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Watchlist />
          </div>
        </div>
      </div>
    </main>
  );
}
