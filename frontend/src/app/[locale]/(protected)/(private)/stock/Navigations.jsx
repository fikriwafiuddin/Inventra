"use client"

import {
  RefreshCw,
  History,
  Users,
  Building,
  BarChart3,
  Boxes,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

function Navigations({ translations }) {
  const navigationCards = [
    {
      title: translations.stockAdjustment.title,
      description: translations.stockAdjustment.description,
      icon: RefreshCw,
      color: "bg-blue-500",
      href: "/stock/adjustment",
      // stats: "12 adjustments bulan ini",
    },
    {
      title: translations.customerReturns.title,
      description: translations.customerReturns.description,
      icon: Users,
      color: "bg-green-500",
      href: "/stock/customer-returns",
      // stats: "8 returns pending",
    },
    {
      title: translations.supplierReturns.title,
      description: translations.supplierReturns.description,
      icon: Building,
      color: "bg-orange-500",
      href: "/stock/supplier-returns",
      // stats: "3 returns dalam proses",
    },
    {
      title: translations.stockOpname.title,
      description: translations.stockOpname.description,
      icon: Boxes,
      color: "bg-purple-500",
      href: "/stock/opname",
      // stats: "Terakhir: 15 Jan 2025",
    },
    {
      title: translations.stockHistory.title,
      description: translations.stockHistory.description,
      icon: History,
      color: "bg-gray-500",
      href: "/stock/history",
      // stats: "47 movements hari ini",
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
  return (
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
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  {/* <Badge variant="secondary" className="text-xs">
                    {card.stats}
                  </Badge> */}
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {card.description}
                </p>
                <Button className="w-full" variant="outline">
                  {translations.buttonNavigation}
                </Button>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default Navigations
