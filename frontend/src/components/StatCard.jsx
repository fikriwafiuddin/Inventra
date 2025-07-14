"use client"

import { formatCurrency } from "@/lib/formatters"

const StatCard = ({ title, value, icon, isCurrency = false, change }) => {
  return (
    <div className="bg-secondary rounded-lg shadow-sm p-6 transition-transform hover:translate-y-[-2px]">
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
              {change.isPositive ? "↑" : "↓"} {change.value}% dari bulan lalu
            </p>
          )}
        </div>

        <div className="p-2 rounded-full bg-primary text-primary-foreground">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
