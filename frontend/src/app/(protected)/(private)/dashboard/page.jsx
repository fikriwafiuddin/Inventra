"use client"

import LatestTransactions from "./LatestTransactions"
import TopProducts from "./TopProducts"
import Stats from "./Stats"
import ChartRevenue from "./ChartRevenue"
import ExpenseSummary from "./ExpenseSummary"
import LowStockAlert from "./LowStockAlert"

function Dashboard() {
  return (
    <div className="space-y-4">
      <Stats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartRevenue />
        <TopProducts />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LatestTransactions />
        {/* <ExpenseSummary /> */}
        <LowStockAlert />
      </div>
    </div>
  )
}

export default Dashboard
