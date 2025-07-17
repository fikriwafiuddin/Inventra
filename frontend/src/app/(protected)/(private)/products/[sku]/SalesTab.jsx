"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Calendar } from "lucide-react"

// Dummy data for the last 7 days
const salesData = [
  { date: "2024-01-15", day: "Mon", sales: 8, revenue: 3200000 },
  { date: "2024-01-16", day: "Tue", sales: 12, revenue: 4800000 },
  { date: "2024-01-17", day: "Wed", sales: 6, revenue: 2400000 },
  { date: "2024-01-18", day: "Thu", sales: 15, revenue: 6000000 },
  { date: "2024-01-19", day: "Fri", sales: 9, revenue: 3600000 },
  { date: "2024-01-20", day: "Sat", sales: 18, revenue: 7200000 },
  { date: "2024-01-21", day: "Sun", sales: 5, revenue: 2000000 },
]

const configTable = {
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
}

function SalesTab({ productPrice }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0)
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
  const averageSales = Math.round(totalSales / 7)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-blue-600">{`Sales: ${payload[0].value} units`}</p>
          <p className="text-green-600">
            {`Revenue: ${formatPrice(payload[0].value * productPrice)}`}
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">7-Day Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
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
                {formatPrice(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">revenue this week</p>
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
              <div className="text-2xl font-bold">{averageSales}</div>
              <p className="text-xs text-muted-foreground">units per day</p>
            </CardContent>
          </Card>
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
              <ResponsiveContainer width="100%" height="100%" config>
                <AreaChart data={salesData}>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SalesTab
