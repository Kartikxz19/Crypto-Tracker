'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchTopByMktCap } from '@/actions/fetchTopByMktCap'
import Image from 'next/image'
import Link from 'next/link'

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  imageUrl: string;
}

const Topcrypto = () => {
    const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTopByMktCap();
                console.log(response);
                if (response.Message === "Success") {
                    const formattedData: CoinData[] = response.Data.map((coin: any) => ({
                        id: coin.CoinInfo.Id,
                        name: coin.CoinInfo.FullName,
                        symbol: coin.CoinInfo.Name,
                        price: coin.RAW.USD.PRICE,
                        marketCap: coin.RAW.USD.MKTCAP,
                        change24h: coin.RAW.USD.CHANGEPCT24HOUR,
                        imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`
                    }));
                    setFilteredCoins(formattedData);
                } else {
                    console.error('API response was not successful');
                }
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Cryptocurrencies</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Coin</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Market Cap</TableHead>
                            <TableHead>Change (24h)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCoins.map((coin) => (
                            <TableRow key={coin.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Image src={coin.imageUrl} alt={coin.name} width={24} height={24} className="rounded-full" />
                                        <span>{`${coin.name} (${coin.symbol})`}</span>
                                    </div>
                                </TableCell>
                                <TableCell>${coin.price.toFixed(2)}</TableCell>
                                <TableCell>${(coin.marketCap / 1000000000).toFixed(2)}B</TableCell>
                                <TableCell>
                                    <Badge variant={coin.change24h >= 0 ? "default" : "destructive"}>
                                        {coin.change24h >= 0 ? `+${coin.change24h.toFixed(1)}%` : `${coin.change24h.toFixed(1)}%`}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                <Link key={coin.id} href={`/Coin/${coin.symbol}`} className='text-white bg-green-500 hover:bg-black dark:hover:bg-white dark:hover:text-black duration-300 hover:scale-110 font-bold py-2 px-4 rounded-sm flex gap-1 items-center'>
                                Visit</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Topcrypto