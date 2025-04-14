# Realtime Stock Market Data Visualization

A realtime stock tracking app done with Next.js 15, TypeScript & Tailwind.

## Features

- 🔍 Search stocks by name or ticker symbol
- 📈 View live stock price updates
- 📊 Analyze historical price trends
- ⭐ Manage a personal watchlist

## Tech Stack

- **Framework**: Next.js 15 (React 19, App Router, RSC support)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **API**: Alpha Vantage

## Getting Started

1. Clone the repository
2. Ensure you get node version higher than 20, and install dependencies:
   ```bash
   npm install
   ```
3. Build then run the development server:
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
src/
├── app/                    # App directory
├── components/            # Reusable components
├── features/             # Feature based modules
│   ├── stocks/          # Stock related stuff
│   └── watchlist/       # Watchlist related stuff
├── lib/                  # Utils and API
├── store/               # Redux store
└── types/               # TypeScript types
```

## Development

- `npm run test` - Run tests
- `npm run dev` - Start dev server
- `npm run build` - Build for production
