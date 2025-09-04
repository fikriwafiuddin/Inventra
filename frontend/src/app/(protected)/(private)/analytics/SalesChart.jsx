import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
const salesData = [
  { date: "2024-01-15", revenue: 3200000 },
  { date: "2024-01-16", revenue: 4800000 },
  { date: "2024-01-17", revenue: 2400000 },
  { date: "2024-01-18", revenue: 6000000 },
  { date: "2024-01-19", revenue: 3600000 },
  { date: "2024-01-20", revenue: 7200000 },
  { date: "2024-01-21", revenue: 2000000 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-success">{`Revenue: ${formatCurrency(
          payload[0].value
        )}`}</p>
      </div>
    )
  }
  return null
}

function SalesChart() {
  return (
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
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
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
              <XAxis dataKey="date" hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="natural"
                dataKey="revenue"
                stroke="var(--chart-2)"
                fill="url(#fillRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesChart
