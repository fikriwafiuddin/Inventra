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

      <PurchaseChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopProducts />
        <BottomProducts />
      </div>
    </div>
  )
}

export default AnalyticsPage
