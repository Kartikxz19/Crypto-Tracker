"use client";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { fetchTopByMktCap } from "@/actions/fetchTopByMktCap";
import { TableSkeleton } from '@/components/TableSkeleton';
import Image from 'next/image';
import { addToWatchlist, removeFromWatchlist } from '@/store/watchlistSlice';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
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

const ITEMS_PER_PAGE = 10;
const Explore: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [filterBy, setFilterBy] = useState<string>('marketcap');
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.coins);

  const sortCoins = useCallback((coinsToSort: CoinData[]) => {
    return [...coinsToSort].sort((a, b) => {
      if (filterBy === 'marketcap') {
        return b.marketCap - a.marketCap;
      } else {
        return b.volume - a.volume;
      }
    });
  }, [filterBy]);

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    setFilteredCoins(sortCoins(coins));
  }, [coins, filterBy, sortCoins]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchTopByMktCap(currentPage, ITEMS_PER_PAGE);
      if (response.Message === "Success") {
        const formattedData: CoinData[] = response.Data.map((coin: any) => ({
          id: coin.CoinInfo.Id,
          name: coin.CoinInfo.FullName,
          symbol: coin.CoinInfo.Name,
          price: coin.RAW.USD.PRICE,
          marketCap: coin.RAW.USD.MKTCAP,
          change24h: coin.RAW.USD.CHANGEPCT24HOUR,
          imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
          volume: coin.RAW.USD.TOTALVOLUME24H,
        }));
        setCoins(formattedData);
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleWatchlistToggle = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      dispatch(removeFromWatchlist(symbol));
    } else {
      dispatch(addToWatchlist(symbol));
    }
  };
  return (
    <>
      <div className="mt-48 ml-11 max-w-[114rem]">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="text-2xl font-bold">All Cryptocurrencies</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0 w-16">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup value={filterBy} onValueChange={handleFilterChange}>
                <DropdownMenuRadioItem value="marketcap">
                  By Market Cap.
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="volume">
                  By 24hr Volume
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Price Change (24h)</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead>Add/Remove from Watchlist</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ?(
              <TableSkeleton/>
            ):(
              <TableBody>
              {filteredCoins.map((coin) => (
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
                          onClick={() => handleWatchlistToggle(coin.symbol)}
                        >
                          {watchlist.includes(coin.symbol) ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
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
          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</Button>
            <span>Page {currentPage + 1}</span>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
    
  );
};

export default Explore;