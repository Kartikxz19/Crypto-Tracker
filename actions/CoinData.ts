//Gets the data for a single coin
"use server";

import axios from "axios";
import { globalCache } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchCoinData(coinId: string) {
  const cacheKey = `coin_${coinId}`;
  const cachedData = globalCache.get(cacheKey);

  if (cachedData) {
    console.log(`Returning cached data for ${coinId}`);
    return cachedData;
  }

  try {
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull`, {
      params: {
        fsyms: coinId,
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
}