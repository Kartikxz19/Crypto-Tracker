//Gets the news for a single coin
'use server'
import axios from 'axios';
import { NewsApiResponse } from '@/types/newsTypes';
import { globalCache } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
export async function fetchNews(symbol: string): Promise<NewsApiResponse> {
  const cacheKey = `news_${symbol}`;
  const cachedData = globalCache.get(cacheKey);

  if (cachedData) {
    console.log(`Returning cached data for ${symbol}`);
    return cachedData;
  }
  if(!process.env.NEWS_API_KEY){
    throw new Error('NEWS_API_KEY environment variable not set');
  }
  console.log(process.env.NEWS_API_KEY);
  const url = `https://newsdata.io/api/1/latest`;

  try {
    const response = await axios.get<NewsApiResponse>(url, {
      params: {
        apikey: process.env.NEWS_API_KEY,
        qInTitle: `${symbol.toLowerCase()} OR ${symbol.toUpperCase()}`,
        language: 'en'
      }
    });
    globalCache.set(cacheKey, response.data, CACHE_TTL);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}