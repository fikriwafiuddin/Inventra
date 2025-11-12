"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, History, Users, Building, Boxes } from "lucide-react"
import Link from "next/link"
import Stats from "./Stats"
import LowStockAlert from "./LowStockAlert"
import LatestMovementStocks from "./LatestMovementStocks"

const navigationCards = [
  {
    title: "Stock Adjustment",
    description: "Adjust stock of goods due to damage, loss or correction",
    icon: RefreshCw,
    color: "bg-blue-500",
    href: "/stock/adjustment",
  },
  {
    title: "Customer Returns",
    description: "Manage returns from customers",
    icon: Users,
    color: "bg-green-500",
    href: "/stock/customer-returns",
  },
  {
    title: "Supplier Returns",
    description: "The process of returning goods to the supplier",
    icon: Building,
    color: "bg-orange-500",
    href: "/stock/supplier-returns",
  },
  {
    title: "Stock Opname",
    description: "Conduct physical stock counts periodically",
    icon: Boxes,
    color: "bg-purple-500",
    href: "/stock/opname",
  },
  {
    title: "Stock History",
    description: "View the stock movement history of all products",
    icon: History,
    color: "bg-gray-500",
    href: "/stock/history",
  },
  // {
  //   title: "Stock Reports",
  //   description: "Analisis dan laporan stock komprehensif",
  //   icon: BarChart3,
  //   color: "bg-indigo-500",
  //   href: "/stock-reports",
  //   stats: "5 laporan tersedia",
  // },
]

const StockManagementPage = () => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Stock Overview Cards */}
      <Stats />

      {/* Navigation Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Link key={index} href={card.href}>
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex-1 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-secondary group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 " />
                      </div>
                      {/* <Badge variant="secondary" className="text-xs">
                        {card.stats}
                      </Badge> */}
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {card.description}
                    </p>
                    <Button className="w-full" variant="outline">
                      Open Page
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
        <LowStockAlert />

        {/* Recent Stock Movements */}
        <LatestMovementStocks />
      </div>
    </div>
  )
}

export default StockManagementPage
