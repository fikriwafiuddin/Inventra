import Stats from "./Stats"
import LowStockAlert from "./LowStockAlert"
import LatestMovementStocks from "./LatestMovementStocks"
import Navigations from "./Navigations"
import { useTranslations } from "next-intl"

const StockManagementPage = () => {
  const t = useTranslations("StockPage")
  const translations = {
    stats: {
      totalProducts: t("stats.totalProducts"),
      outOfStock: t("stats.outOfStock"),
      lowStock: t("stats.lowStock"),
      todayMovement: t("stats.todayMovement"),
    },
    navigations: {
      title: t("navigations.title"),
      stockAdjustment: {
        title: t("navigations.stockAdjustment.title"),
        description: t("navigations.stockAdjustment.description"),
      },
      customerReturns: {
        title: t("navigations.customerReturns.title"),
        description: t("navigations.customerReturns.description"),
      },
      supplierReturns: {
        title: t("navigations.supplierReturns.title"),
        description: t("navigations.supplierReturns.description"),
      },
      stockOpname: {
        title: t("navigations.stockOpname.title"),
        description: t("navigations.stockOpname.description"),
      },
      stockHistory: {
        title: t("navigations.stockHistory.title"),
        description: t("navigations.stockHistory.description"),
      },
      buttonNavigation: t("navigations.buttonNavigation"),
    },
    stockAlert: {
      title: t("stockAlert.title"),
      stock: t("stockAlert.stock"),
      buttonNavigation: t("stockAlert.buttonNavigation"),
      status: {
        outOfStock: t("stockAlert.status.outOfStock"),
        low: t("stockAlert.status.low"),
      },
    },
    latestMovementStock: {
      title: t("latestMovementStock.title"),
      buttonNavigation: t("latestMovementStock.buttonNavigation"),
    },
  }
  // Mock data untuk overview
  const stockOverview = {
    totalProducts: 1250,
    totalValue: 15750000,
    lowStockItems: 23,
    outOfStockItems: 8,
    todayMovements: 47,
  }

  // Mock data untuk low stock items
  const lowStockItems = [
    {
      id: 1,
      name: "Kemeja Putih Size M",
      currentStock: 3,
      minStock: 10,
      category: "Pakaian",
    },
    {
      id: 2,
      name: "Celana Jeans Blue 32",
      currentStock: 1,
      minStock: 5,
      category: "Pakaian",
    },
    {
      id: 3,
      name: "Sepatu Sneakers Hitam",
      currentStock: 2,
      minStock: 8,
      category: "Sepatu",
    },
    {
      id: 4,
      name: "Tas Ransel Coklat",
      currentStock: 0,
      minStock: 6,
      category: "Aksesoris",
    },
  ]

  // Mock data untuk recent movements
  const recentMovements = [
    {
      id: 1,
      product: "Kemeja Biru",
      type: "in",
      quantity: 20,
      reason: "Purchase Order",
      time: "10:30 AM",
      user: "Admin",
    },
    {
      id: 2,
      product: "Celana Hitam",
      type: "out",
      quantity: 5,
      reason: "Sales Transaction",
      time: "10:15 AM",
      user: "Kasir 1",
    },
    {
      id: 3,
      product: "Sepatu Sport",
      type: "adjustment",
      quantity: -2,
      reason: "Stock Adjustment",
      time: "09:45 AM",
      user: "Manager",
    },
    {
      id: 4,
      product: "Jaket Denim",
      type: "return",
      quantity: 1,
      reason: "Customer Return",
      time: "09:30 AM",
      user: "CS Team",
    },
  ]

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Stock Overview Cards */}
      <Stats translations={translations.stats} />

      {/* Navigation Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Kelola Stock</h2>
        <Navigations translations={translations.navigations} />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <LowStockAlert translations={translations.stockAlert} />

        {/* Recent Stock Movements */}
        <LatestMovementStocks translations={translations.latestMovementStock} />
      </div>
    </div>
  )
}

export default StockManagementPage
