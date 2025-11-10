"use client"

import { formatCurrency } from "@/lib/formatters"
import { Card, CardContent } from "./ui/card"

const StatCard = ({ title, value, icon, isCurrency = false, change }) => {
  return (
    <Card className="transition-transform hover:translate-y-[-2px]">
      <CardContent>
        <div>
          <div>
            <div className="flex justify-between items-start w-full">
              <h3 className="text-sm font-medium">{title}</h3>
              <div>{icon}</div>
            </div>
            <div className="mt-2 flex items-baseline">
              <p
                className="font-semibold text-[clamp(1rem,2vw,1.5rem)] break-words max-w-[180px] truncate"
                title={
                  isCurrency ? formatCurrency(value) : value.toLocaleString()
                }
              >
                {isCurrency ? formatCurrency(value) : value.toLocaleString()}
              </p>
            </div>

            {change && (
              <p
                className={`mt-2 text-xs font-medium ${
                  change.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.isPositive ? "↑" : "↓"} {change.value}% dari bulan lalu
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
