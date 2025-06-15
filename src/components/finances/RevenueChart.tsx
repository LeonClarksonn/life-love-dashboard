
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { date: "2025-06-01", btc: 45000 },
  { date: "2025-06-02", btc: 46500 },
  { date: "2025-06-03", btc: 48000 },
  { date: "2025-06-04", btc: 47000 },
  { date: "2025-06-05", btc: 49500 },
  { date: "2025-06-06", btc: 51000 },
  { date: "2025-06-07", btc: 50500 },
  { date: "2025-06-08", btc: 52000 },
  { date: "2025-06-09", btc: 53500 },
  { date: "2025-06-10", btc: 53000 },
  { date: "2025-06-11", btc: 54000 },
  { date: "2025-06-12", btc: 55500 },
  { date: "2025-06-13", btc: 54800 },
  { date: "2025-06-14", btc: 56200 },
  { date: "2025-06-15", btc: 57000 },
];

const chartConfig = {
  btc: {
    label: "Bitcoin",
    color: "#f97316",
  },
} satisfies ChartConfig

const RevenueChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
         <YAxis
          domain={['dataMin - 2000', 'dataMax + 2000']}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
          formatter={(value) => 
            typeof value === 'number' 
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value) 
            : value
          }
        />
        <Line
          dataKey="btc"
          type="natural"
          stroke="var(--color-btc)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default RevenueChart;
