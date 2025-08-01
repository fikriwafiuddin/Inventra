"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Package,
  RefreshCw,
  History,
  Users,
  Building,
  BarChart3,
  Eye,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
} from "lucide-react"
import Link from "next/link"
import StatCard from "@/components/StatCard"

const StockManagementPage = () => {
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

  const navigationCards = [
    {
      title: "Stock Adjustment",
      description:
        "Sesuaikan stock barang karena kerusakan, kehilangan, atau koreksi",
      icon: RefreshCw,
      color: "bg-blue-500",
      href: "/stock/adjustment",
      stats: "12 adjustments bulan ini",
    },
    {
      title: "Customer Returns",
      description: "Kelola pengembalian barang dari pelanggan",
      icon: Users,
      color: "bg-green-500",
      href: "/stock/customer-returns",
      stats: "8 returns pending",
    },
    {
      title: "Supplier Returns",
      description: "Proses pengembalian barang ke pemasok",
      icon: Building,
      color: "bg-orange-500",
      href: "/stock/supplier-returns",
      stats: "3 returns dalam proses",
    },
    {
      title: "Stock Opname",
      description: "Lakukan perhitungan fisik stock secara berkala",
      icon: Boxes,
      color: "bg-purple-500",
      href: "/stock/opname",
      stats: "Terakhir: 15 Jan 2025",
    },
    {
      title: "Stock History",
      description: "Lihat riwayat pergerakan stock semua produk",
      icon: History,
      color: "bg-gray-500",
      href: "/stock/history",
      stats: "47 movements hari ini",
    },
    {
      title: "Stock Reports",
      description: "Analisis dan laporan stock komprehensif",
      icon: BarChart3,
      color: "bg-indigo-500",
      href: "/stock-reports",
      stats: "5 laporan tersedia",
    },
  ]

  const getMovementIcon = (type) => {
    switch (type) {
      case "in":
        return <ArrowUpRight className="h-4 w-4 text-success" />
      case "out":
        return <ArrowDownRight className="h-4 w-4 text-destructive" />
      case "adjustment":
        return <RefreshCw className="h-4 w-4 text-info" />
      case "return":
        return <Users className="h-4 w-4 text-warning" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStockStatus = (current, min) => {
    if (current === 0)
      return { status: "Habis", color: "bg-red-100 text-destructive" }
    if (current <= min)
      return { status: "Rendah", color: "bg-yellow-100 text-warning" }
    return { status: "Normal", color: "bg-green-100 text-success" }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Products" value={1250} icon={<Package />} />
        <StatCard
          title="Stock Habis"
          value={8}
          icon={<AlertCircle className="text-destructive" />}
        />
        <StatCard
          title="Stock Rendah"
          value={23}
          icon={<AlertTriangle className="text-warning" />}
        />
        <StatCard
          title="Pergerakan Hari Ini"
          value={40}
          icon={<RefreshCw className="text-info" />}
        />
      </div>

      {/* Navigation Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Kelola Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Link key={index} href={card.href}>
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-secondary group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 " />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {card.stats}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {card.description}
                    </p>
                    <Button className="w-full" variant="outline">
                      Buka Halaman
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => {
                const stockStatus = getStockStatus(
                  item.currentStock,
                  item.minStock
                )
                return (
                  <Card>
                    <CardContent
                      key={item.id}
                      className="flex items-center justify-between rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Stock: {item.currentStock} / Min: {item.minStock}
                        </p>
                        <Badge className={`text-xs ${stockStatus.color}`}>
                          {stockStatus.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              Lihat Semua Alert
            </Button>
          </CardContent>
        </Card>

        {/* Recent Stock Movements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              Pergerakan Stock Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <Card>
                  <CardContent
                    key={movement.id}
                    className="flex items-center justify-between bg-primary-foreground rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getMovementIcon(movement.type)}
                      <div>
                        <p className="font-medium">{movement.product}</p>
                        <p className="text-sm">{movement.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          movement.type === "in" || movement.type === "return"
                            ? "text-green-600"
                            : movement.type === "out"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {movement.type === "out"
                          ? "-"
                          : movement.quantity > 0
                          ? "+"
                          : ""}
                        {Math.abs(movement.quantity)}
                      </p>
                      <p className="text-xs">{movement.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <History className="h-4 w-4 mr-2" />
              Lihat Riwayat Lengkap
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StockManagementPage
