## State Management: Redux Toolkit

I choose Redux for state management because:
• It has built in support for TypeScript
• We have Redux DevTools for debug
• It has easier integration with React components
• And I just know it better than the other ones xD I know that Zustand might be better because of less boilerplate, but anyways, I dont have enough time for now.

## Component Architecture

I followed feature based architecture with:
• Server Components for static content
• Client Components for interactive features
• Clear separation between UI & business logic

### RSC vs CC

I used server components for:
• Layout components
• Static content
• Initial data fetching

I used client components for:
• Interactive features (such as search)
• Realtime updates
• Charts and visuals

## What would you do with more time and how would you scale this for real users?

• Implement caching for stock data to reduce API calls
• Use CDN for static assets
• Add rate limiting and API key rotation for Alpha Vantage
• Implement WS connection for realtime updates
• Add monitoring and alerting for API health and app performance
• Add proper error boundaries and fallback for better UX
