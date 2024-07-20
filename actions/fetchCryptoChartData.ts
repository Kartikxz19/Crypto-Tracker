//Gets the Chart data for a single coin
'use server'

import axios from 'axios'
import { globalCache } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchCryptoChartData(symbol: string) {
  const cacheKey = `chart_data_${symbol}`;
  const cachedData = globalCache.get(cacheKey);

  if (cachedData) {
    console.log(`Returning cached chart data for ${symbol}`);
    return cachedData;
  }

  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
      params: {
        fsym: symbol,
        tsym: 'USD',
        limit: 30,
      },
      headers: {
        authorization: process.env.CRYPTO_COMPARE_API_KEY,
      }
    });
    
    const data = response.data;
    globalCache.set(cacheKey, data, CACHE_TTL);
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    throw error;
  }
}