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

const purchaseData = [
  { date: "2024-01-15", purchase: 5 },
  { date: "2024-01-16", purchase: 8 },
  { date: "2024-01-17", purchase: 3 },
  { date: "2024-01-18", purchase: 10 },
  { date: "2024-01-19", purchase: 6 },
  { date: "2024-01-20", purchase: 12 },
  { date: "2024-01-21", purchase: 4 },
]

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
  return (
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={purchaseData}>
              <defs>
                <linearGradient id="fillPurchase" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="purchase"
                stroke="var(--chart-1)"
                fill="url(#fillPurchase)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default PurchaseChart
