"use client"

import React, { useState } from "react"
import Stats from "./Stats"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SalesChart from "./SalesChart"
import TopProducts from "./TopProducts"
import BottomProducts from "./BottomProducts"
import PurchaseChart from "./PurchaseChart"

function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState("1d")

  return (
    <div className="space-y-4">
      <Select value={timePeriod} onValueChange={setTimePeriod}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1d">1 Day</SelectItem>
          <SelectItem value="7d">1 Week</SelectItem>
          <SelectItem value="30d">1 Month</SelectItem>
          <SelectItem value="90d">3 Months</SelectItem>
          <SelectItem value="180d">6 Months</SelectItem>
          <SelectItem value="1y">1 Year</SelectItem>
        </SelectContent>
      </Select>

      <Stats />

      <SalesChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopProducts />
        <BottomProducts />
      </div>

      <PurchaseChart />
    </div>
  )
}

export default AnalyticsPage
