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



export function SingleChartcomponent({symbol}:{symbol:string}) {
  const [chartData, setChartData] = useState([])
  const chartConfig = {
    Price: {
      label: symbol,
      color: "green",
    },
  } satisfies ChartConfig
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCryptoChartData(symbol);
        const Data = response.Data;
        console.log(Data,"Data");
        if (response.Response === "Success") {
          const formattedData = Data.Data.map((Item: any, index: number) => ({
            date: new Date(Item.time * 1000).toLocaleDateString(),
            Price: Item.close,
          }));
          setChartData(formattedData);
        } else {
          console.error('API respons was not successful');
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
        <CardTitle>Today&apos;s Price</CardTitle>
        <CardDescription>Historical Data</CardDescription>
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
              dataKey='Price'
              type='natural'
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
              {symbol} Price Trend <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}