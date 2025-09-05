"use client"

import Stats from "./Stats"
import SalesChart from "./SalesChart"
import TopProducts from "./TopProducts"
import BottomProducts from "./BottomProducts"
import PurchaseChart from "./PurchaseChart"

function AnalyticsPage() {
  return (
    <div className="space-y-4">
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
