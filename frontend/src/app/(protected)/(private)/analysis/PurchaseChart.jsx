import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from "recharts"
import { Calendar } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useAnalysisPurchases } from "@/services/hooks/analysis-hook"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-success">Purchases: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

function PurchaseChart() {
  const [timePeriod, setTimePeriod] = useState("7d")
  const { data: purchasesData, isPending } = useAnalysisPurchases(timePeriod)
  console.log(purchasesData)

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
            <Calendar className="h-5 w-5" />
            Purchase Trend (Last 7 Days)
          </CardTitle>
          <CardDescription>
            Daily purchase activity for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {isPending ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={purchasesData}>
                  <defs>
                    <linearGradient
                      id="fillPurchase"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="date" hide={true} />
                  <Tooltip content={<CustomTooltip />} />

                  <Area
                    type="natural"
                    dataKey="amount"
                    stroke="var(--chart-1)"
                    fill="url(#fillPurchase)"
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

export default PurchaseChart
