import LatestTransactions from "./LatestTransactions"
import TopProducts from "./TopProducts"
import Stats from "./Stats"
import ChartRevenue from "./ChartRevenue"
import ExpenseSummary from "./ExpenseSummary"
import LowStockAlert from "./LowStockAlert"
import { useTranslations } from "next-intl"

function Dashboard() {
  const t = useTranslations("DashboardPage")

  const statsTranslations = {
    revenue: t("stats.revenue"),
    products: t("stats.products"),
    orders: t("stats.orders"),
    outOfStock: t("stats.outOfStock"),
  }

  const chartRevenueTranslations = {
    title: t("chartRevenue.title"),
  }

  const topProductsTranslations = {
    title: t("topProducts.title"),
  }

  const latestOrderTranslations = {
    title: t("orderTable.title"),
    tableHead: {
      orderId: t("orderTable.tableHead.orderId"),
      date: t("orderTable.tableHead.date"),
      amount: t("orderTable.tableHead.amount"),
    },
  }

  const stockAlertTranslations = {
    title: t("stockAlert.title"),
    status: {
      outOfStock: t("stockAlert.status.outOfStock"),
      lowStock: t("stockAlert.status.lowStock"),
      inStock: t("stockAlert.status.lowStock"),
    },
    stock: t("stockAlert.stock"),
    min: t("stockAlert.min"),
    link: t("stockAlert.link"),
  }

  return (
    <div className="space-y-4">
      <Stats translations={statsTranslations} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartRevenue translations={chartRevenueTranslations} />
        <TopProducts translations={topProductsTranslations} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LatestTransactions translations={latestOrderTranslations} />
        {/* <ExpenseSummary /> */}
        <LowStockAlert translations={stockAlertTranslations} />
      </div>
    </div>
  )
}

export default Dashboard
