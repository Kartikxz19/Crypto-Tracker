"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromWatchlist } from '@/store/watchlistSlice';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableSkeleton } from '@/components/TableSkeleton';
import Image from 'next/image';
import { Minus } from 'lucide-react';
import { fetchMultipleCoinData } from '@/actions/fetchMultipleCoinData';
import Link from "next/link";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  imageUrl: string;
  volume: number;
}

const Watchlist: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const watchlist = useAppSelector((state) => state.watchlist.coins);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (watchlist.length === 0) {
        setCoins([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchMultipleCoinData(watchlist);
        if (response && response.RAW) {
          const formattedData: CoinData[] = Object.entries(response.RAW).map(([symbol, data]: [string, any]) => ({
            id: symbol,
            name: data.USD.FROMSYMBOL,
            symbol: symbol,
            price: data.USD.PRICE,
            marketCap: data.USD.MKTCAP,
            change24h: data.USD.CHANGEPCT24HOUR,
            imageUrl: `https://www.cryptocompare.com${data.USD.IMAGEURL}`,
            volume: data.USD.TOTALVOLUME24H,
          }));
          setCoins(formattedData);
        }
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [watchlist]);

  const handleRemoveFromWatchlist = (symbol: string) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <div className="mt-48 ml-11 max-w-[114rem]">
      <Card>
        <CardHeader>
          <div className="text-2xl font-bold">Your Watchlist</div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Price Change (24h)</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <TableBody>
                {coins.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          src={coin.imageUrl}
                          alt={coin.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>{`${coin.name} (${coin.symbol})`}</span>
                      </div>
                    </TableCell>
                    <TableCell>${coin.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ${(coin.marketCap / 1000000000).toFixed(2)}B
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          coin.change24h >= 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coin.change24h >= 0
                          ? `+${coin.change24h.toFixed(1)}%`
                          : `${coin.change24h.toFixed(1)}%`}
                      </span>
                    </TableCell>
                    <TableCell>${coin.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWatchlist(coin.symbol)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                                <Link key={coin.id} href={`/Coin/${coin.symbol}`} className='text-white bg-green-500 hover:bg-black dark:hover:bg-white dark:hover:text-black duration-300 hover:scale-110 font-bold py-2 px-4 rounded-sm flex gap-1 items-center'>
                                Visit</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {!isLoading && coins.length === 0 && (
            <div className="text-center py-4">
              Your watchlist is empty. Add coins from the Explore page.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Watchlist;