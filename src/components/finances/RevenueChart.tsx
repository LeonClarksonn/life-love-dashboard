
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useTransactions } from "@/hooks/useFinance"
import { useMemo } from "react"
import { format, eachDayOfInterval, startOfMonth, endOfMonth, parseISO } from "date-fns"
import { Skeleton } from "../ui/skeleton"

const chartConfig = {
  expense: {
    label: "Expense",
    color: "#ef4444",
  },
  income: {
    label: "Income",
    color: "#22c55e",
  }
} satisfies ChartConfig

const RevenueChart = () => {
  const { data: transactions, isLoading } = useTransactions();
  
  const chartData = useMemo(() => {
    if (!transactions) return [];
    
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const aggregatedData = daysInMonth.map(day => {
      const dayString = format(day, 'yyyy-MM-dd');
      
      const dayTransactions = transactions.filter(t => format(parseISO(t.date), 'yyyy-MM-dd') === dayString);

      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
        
      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        date: dayString,
        income,
        expense,
      };
    });

    return aggregatedData;
  }, [transactions]);
  
  if (isLoading) return <Skeleton className="min-h-[250px] w-full" />

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
            return format(parseISO(value), "MMM d");
          }}
        />
         <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
          formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}
        />
        <Line
          dataKey="income"
          type="monotone"
          stroke="var(--color-income)"
          strokeWidth={2}
          dot={true}
        />
        <Line
          dataKey="expense"
          type="monotone"
          stroke="var(--color-expense)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default RevenueChart;
