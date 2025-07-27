"use client"

import { formatCurrency } from "@/lib/formatters"
import { Card, CardContent } from "./ui/card"

const StatCard = ({ title, value, icon, isCurrency = false, change }) => {
  return (
    <Card className="transition-transform hover:translate-y-[-2px]">
      <CardContent>
        <div className="">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold">
                  {isCurrency ? formatCurrency(value) : value.toLocaleString()}
                </p>
              </div>

              {change && (
                <p
                  className={`mt-2 text-xs font-medium ${
                    change.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change.isPositive ? "↑" : "↓"} {change.value}% dari bulan
                  lalu
                </p>
              )}
            </div>

            <div>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
