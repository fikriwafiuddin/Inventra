"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Calendar } from "lucide-react"
import { useGetProductSalesStats } from "@/services/hooks/statistic-hook"
import { formatCurrency } from "@/lib/formatters"
import { Skeleton } from "@/components/ui/skeleton"

function SalesTab({ sku }) {
  const { data, isPending } = useGetProductSalesStats(sku)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-info">{`Sales: ${payload[0].value} units`}</p>
          <p className="text-success">
            {`Revenue: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <p>Track product performance and sales trends</p>
      </div>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {isPending || !data ? (
            <>
              <Skeleton className="h-[125px]" />
              <Skeleton className="h-[125px]" />
              <Skeleton className="h-[125px]" />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    7-Day Sales
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.totalUnitSold || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    units sold this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Weekly Revenue
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(data?.totalRevenue || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    revenue this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Daily Average
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.averageUnitSoldPerDay || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">units per day</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Trend (Last 7 Days)
            </CardTitle>
            <CardDescription>
              Daily sales performance for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isPending || !data ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%" config>
                  <AreaChart data={data?.salesData || []}>
                    <defs>
                      <linearGradient
                        id="fillRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      className="text-sm"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-sm"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="natural"
                      dataKey="sales"
                      stroke="var(--chart-2)"
                      fill="url(#fillRevenue)"
                      strokeWidth={3}
                      //   dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SalesTab
