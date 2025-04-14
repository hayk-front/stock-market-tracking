"use client";

interface StockPriceProps {
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export function StockPrice({
  price,
  change,
  changePercent,
  currency,
}: StockPriceProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="text-right">
      <div className="text-2xl font-bold text-black">
        {currency} {price.toFixed(2)}
      </div>
      <div className={`text-sm ${changeColor}`}>
        {isPositive ? "+" : ""}
        {change.toFixed(2)} ({changePercent.toFixed(2)}%)
      </div>
    </div>
  );
}
