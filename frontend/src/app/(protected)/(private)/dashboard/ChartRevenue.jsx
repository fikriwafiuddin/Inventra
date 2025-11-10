"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetWeeklyIncomeInMonth } from "@/services/hooks/statistic-hook"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ChartRevenue() {
  const { isPending, data: chartData } = useGetWeeklyIncomeInMonth()
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-2)",
    },
  }

  return (
    <Card className="gap-2 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Revenue this month
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {isPending ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={2} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default ChartRevenue
