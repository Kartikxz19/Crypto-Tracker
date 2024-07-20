'use client'
import { fetchCoinData } from '@/actions/CoinData'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { SingleChartcomponent } from '@/components/SingleChart'
import { fetchNews } from '@/actions/FetchNews'
import Link from 'next/link'
import Loader from '@/components/Loader'
import Error from '@/components/Error'
interface CoinDataType {
  RAW: {
    [key: string]: {
      USD: {
        PRICE: number;
        MKTCAP: number;
        CHANGEPCT24HOUR: number;
        IMAGEURL: string;
        TOTALVOLUME24H: number;
        HIGHDAY: number;
        LOWDAY: number;
        FROMSYMBOL: string;
        CHANGE24HOUR: number;
        VOLUME24HOURTO: number;
        CIRCULATINGSUPPLY: number;
        SUPPLY: number;
        CONVERSIONSYMBOL: string;
      }
    }
  };
  DISPLAY: {
    [key: string]: {
      USD: {
        PRICE: string;
        MKTCAP: string;
        CHANGEPCT24HOUR: string;
        TOTALVOLUME24H: string;
        HIGHDAY: string;
        LOWDAY: string;
      }
    }
  };
}

interface NewsItem {
    title: string;
    description: string;
    link: string;
  }
// a custom error type
  const createError = (message: string): Error => {
    return { name: 'Error', message } as Error;
};
  const Page: React.FC<{params:{id:string}}> = ({params}) => {
      const [coinData, setCoinData] = useState<CoinDataType | null>(null);
      const [newsData, setNewsData] = useState<NewsItem[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  setIsLoading(true);
                  setError(null);
                  const [coinResponse, newsResponse] = await Promise.all([
                      fetchCoinData(params.id),
                      fetchNews(params.id)
                  ]);
                  
                  if (coinResponse && coinResponse.RAW && coinResponse.DISPLAY) {
                      setCoinData(coinResponse);
                  } else {
                    throw createError("Invalid coin data structure received from API");
                  }
  
                  if (newsResponse && newsResponse.results) {
                      setNewsData(newsResponse.results.slice(0, 3));
                  } else {
                    throw createError("Invalid news data structure received from API");
                  }
              } catch (error) {
                  console.error("Error fetching data:", error);
                  setError("Failed to fetch data. Please try again later.");
              } finally {
                  setIsLoading(false);
              }
          }
          fetchData();
      }, [params.id]);

      if (isLoading) {
        return (
          <Loader/>
        );
      }
      if (error) {
        return (
          <Error error={error}/>
        );
      }
    if (!coinData) return <div className='fixed inset-0 flex items-center justify-center bg-white dark:bg-black text-center max-w-md w-full mx-4'>No data available</div>;

    const { RAW, DISPLAY } = coinData;
    const coinInfo = RAW[params.id].USD;
    const displayInfo = DISPLAY[params.id].USD;


    return (
        <div className="flex flex-col items-start lg:flex-row lg:justify-between gap-8 max-w-full mx-auto py-6 px-16 mt-48">
            <div className="flex flex-col items-start ml-6 ">

                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2 ml-[-16px]">
                        <Image src={`https://www.cryptocompare.com${coinInfo.IMAGEURL}`} alt={coinInfo.FROMSYMBOL} width={48} height={48} className="rounded-full" />
                        <h1 className="text-4xl font-bold">{coinInfo.FROMSYMBOL}</h1>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                coinInfo.CHANGEPCT24HOUR >= 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                            {displayInfo.CHANGEPCT24HOUR}%
                        </span>
                    </div>
                    <p className="text-2xl font-semibold">{displayInfo.PRICE}</p>
                </div>

                <div className="mb-12 w-full  bg-white">
                    <SingleChartcomponent symbol={params.id}/>
                </div>


                <div className="mt-6">

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Performance</h2>
                        <div className="relative h-4 bg-gray-200 rounded">
                            <div 
                                className="absolute h-full bg-green-500 rounded" 
                                style={{
                                    left: `${((coinInfo.LOWDAY - coinInfo.LOWDAY) / (coinInfo.HIGHDAY - coinInfo.LOWDAY)) * 100}%`,
                                    right: `${100 - ((coinInfo.PRICE - coinInfo.LOWDAY) / (coinInfo.HIGHDAY - coinInfo.LOWDAY)) * 100}%`
                                }}
                            />
                            <div 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
                                style={{
                                    left: `${((coinInfo.PRICE - coinInfo.LOWDAY) / (coinInfo.HIGHDAY - coinInfo.LOWDAY)) * 100}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span>{displayInfo.LOWDAY}</span>
                            <span>{displayInfo.HIGHDAY}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Fundamentals</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold px-2 py-1 rounded-full bg-green-500 text-white">Market Cap</span>
                                <p>{displayInfo.MKTCAP}</p>
                            </div>
                            <div>
                                <span className="font-semibold px-2 py-1 rounded-full  bg-green-500 text-white">24h Trading Vol</span>
                                <p>{displayInfo.TOTALVOLUME24H}</p>
                            </div>
                            <div>
                                <span className="font-semibold px-2 py-1 rounded-full  bg-green-500 text-white">Circulating Supply</span>
                                <p>{coinInfo.CIRCULATINGSUPPLY.toLocaleString()} {coinInfo.FROMSYMBOL}</p>
                            </div>
                            <div>
                                <span className="font-semibold px-2 py-1 rounded-full  bg-green-500 text-white">Total Supply</span>
                                <p>{coinInfo.SUPPLY.toLocaleString()} {coinInfo.FROMSYMBOL}</p>
                            </div>
                            <div>
                                <span className="font-semibold px-2 py-1 rounded-full  bg-green-500 text-white">Max Supply</span>
                                <p>{coinInfo.CONVERSIONSYMBOL || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-2">About {coinInfo.FROMSYMBOL}</h2>
                        <p>
                            {coinInfo.FROMSYMBOL} is a cryptocurrency. For more detailed information, 
                            please refer to official sources and conduct your own research.
                        </p>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/3 mt-28">
                <Card>
                    <CardHeader>
                        <CardTitle>News & Updates</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {newsData.map((news, index) => (
                            <Link key={index} href={news.link}>
                                <div key={index} className="flex items-start gap-4 bg-muted/20 rounded-lg p-4">
                                <div className="grid gap-1">
                                    <div className="font-medium">{news.title}</div>
                                    <p className="text-sm text-muted-foreground">
                                        {news.description.length > 100 ? news.description.slice(0, 100) + '...' : news.description}
                                    </p>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Page;