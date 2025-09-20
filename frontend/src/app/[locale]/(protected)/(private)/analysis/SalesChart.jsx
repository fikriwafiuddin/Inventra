import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
import { useAnalysisSales } from "@/services/hooks/analysis-hook"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

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
  const [timePeriod, setTimePeriod] = useState("7d")
  const { data: salesData, isPending } = useAnalysisSales(timePeriod)

  return (
    <div className="space-y-2">
      <Select value={timePeriod} onValueChange={setTimePeriod}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">1 Week</SelectItem>
          <SelectItem value="30d">1 Month</SelectItem>
          <SelectItem value="90d">3 Months</SelectItem>
          <SelectItem value="180d">6 Months</SelectItem>
          <SelectItem value="1y">1 Year</SelectItem>
        </SelectContent>
      </Select>
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
            {isPending ? (
              <Skeleton className="h-full w-full" />
            ) : (
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SalesChart
