"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

function ChartRevenue() {
  const chartData = [
    { week: "Week 1", revenue: 186 },
    { week: "Week 2", revenue: 305 },
    { week: "Week 3", revenue: 237 },
    { week: "Week 4", revenue: 73 },
  ]
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-2)",
    },
  }
  return (
    <div className="lg:col-span-2 bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">
        Revenue this month
      </h3>
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
    </div>
  )
}

export default ChartRevenue
