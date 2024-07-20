# CRYPTO-TRACKER

A Next.js application for tracking cryptocurrencies.

## Project Structure
CRYPTO-TRACKER/
├── actions/
│   ├── AllCrypto.ts
│   ├── CoinData.ts
│   ├── fetchCryptoChartData.ts
│   ├── fetchMultipleCoinData.ts
│   ├── FetchNews.ts
│   └── fetchTopByMarketCap.ts
├── app/
│   ├── api/
│   ├── Coin/[id]/
│   │   └── page.tsx
│   └── Explore/
│       └── page.tsx
├── components/
│   ├── ui/
│   ├── Card.tsx
│   ├── Error.tsx
│   ├── FloatingDock.tsx
│   ├── Global.tsx
│   ├── GlobalChart.tsx
│   ├── Home.tsx
│   ├── Loader.tsx
│   ├── Navbar.tsx
│   ├── News.tsx
│   ├── SingleChart.tsx
│   ├── TableSkeleton.tsx
│   └── TopCrypto.tsx
├── lib/
│   ├── cache.ts
│   ├── coinSymbols.ts
│   └── utils.ts
├── public/
│   ├── loading.svg
│   ├── next.svg
│   └── vercel.svg
├── store/
│   ├── hooks.ts
│   ├── store.ts
│   └── watchlistSlice.ts
├── types/
│   └── types.ts
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
└── providers.tsx
Copy
## Description

This project is a cryptocurrency tracking application built with Next.js. It includes features such as:

- Fetching and displaying cryptocurrency data
- Coin-specific pages
- News feed
- Global market overview
- Watchlist functionality

## Key Components

- `actions/`: API calls and data fetching functions
- `app/`: Next.js app router structure
- `components/`: Reusable React components
- `lib/`: Utility functions and shared logic
- `public/`: Static assets
- `store/`: State management (Using Redux Toolkit)
- `types/`: TypeScript type definitions
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   C r y p t o - T r a c k e r 
 
 
