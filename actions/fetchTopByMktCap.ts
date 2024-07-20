//Gets the top coins by market cap
"use server";

import axios from "axios";
import { globalCache } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchTopByMktCap(page: number=0, limit: number=10) {
  const cacheKey = `top_by_mktcap_${page}_${limit}`;
  const cachedData = globalCache.get(cacheKey);

  if (cachedData) {
    console.log(`Returning cached data for top by market cap page ${page}`);
    return cachedData;
  }

  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull', {
      params: {
        limit: limit,
        page: page,
        tsym: 'USD',
      },
      headers: {
        authorization: process.env.CRYPTO_COMPARE_API_KEY
      }
    });

    const data = response.data;
    globalCache.set(cacheKey, data, CACHE_TTL);
    return data;
  } catch (error) {
    console.error("Error fetching top by market cap:", error);
    throw error;
  }
}