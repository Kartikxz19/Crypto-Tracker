// Gets the data for multiple coins
"use server";

import axios from "axios";
import { globalCache } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const fetchMultipleCoinData = async (coinSymbols: string[]) => {
  const sortedSymbols = [...coinSymbols].sort().join(',');
  const cacheKey = `multiple_coins_${sortedSymbols}`;
  const cachedData = globalCache.get(cacheKey);

  if (cachedData) {
    console.log(`Returning cached data for multiple coins: ${sortedSymbols}`);
    return cachedData;
  }

  try {
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull`, {
      params: {
        fsyms: sortedSymbols,
        tsyms: 'USD',
      },
      headers: {
        authorization: process.env.CRYPTO_COMPARE_API_KEY
      }
    });

    const data = response.data;
    globalCache.set(cacheKey, data, CACHE_TTL);
    return data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw error;
  }
};