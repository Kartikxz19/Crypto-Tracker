"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, Legend } from "recharts"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchCryptoChartData } from "@/actions/fetchCryptoChartData"

const chartConfig = {
  BTC: {
    label: "BTC",
    color: "orange",
  },
  ETH: {
    label: "ETH",
    color: "blue",
  },
  SOL: {
    label: "SOL",
    color: "green",
  },
} satisfies ChartConfig

export function Chartcomponent() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [btcData, ethData, solData] = await Promise.all([
          fetchCryptoChartData('BTC'),
          fetchCryptoChartData('ETH'),
          fetchCryptoChartData('SOL')
        ]);

        if (btcData.Response === "Success" && ethData.Response === "Success" && solData.Response === "Success") {
          const formattedData = btcData.Data.Data.map((btcItem: any, index: number) => ({
            date: new Date(btcItem.time * 1000).toLocaleDateString(),
            BTC: btcItem.close,
            ETH: ethData.Data.Data[index].close,
            SOL: solData.Data.Data[index].close
          }));
          setChartData(formattedData);
        } else {
          console.error('One or more API responses were not successful');
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
        <CardTitle>Crypto Price Comparison</CardTitle>
        <CardDescription>BTC, ETH, and SOL Historical Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend />
            <Line
              dataKey="BTC"
              type="monotone"
              stroke="orange"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="ETH"
              type="monotone"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="SOL"
              type="monotone"
              stroke="green"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Crypto Price Trends <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing historical prices for BTC, ETH, and SOL
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}