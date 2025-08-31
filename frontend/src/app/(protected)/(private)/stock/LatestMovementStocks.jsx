"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useGetLatestStockMovements } from "@/services/hooks/statistic-hook"
import { TruckIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  RefreshCw,
  History,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/formatters"

function LatestMovementStocks() {
  const { data, isPending } = useGetLatestStockMovements()

  const getMovementIcon = (type) => {
    switch (type) {
      case "purchase":
        return <ArrowUpRight className="h-4 w-4 text-success" />
      case "sales":
        return <ArrowDownRight className="h-4 w-4 text-destructive" />
      case "adjustment":
        return <RefreshCw className="h-4 w-4 text-info" />
      case "customerReturn":
        return <Users className="h-4 w-4 text-warning" />
      case "supplierReturn":
        return <TruckIcon className="h-4 w-4 text-warning" />
      case "opname":
        return <Boxes className="h-4 w-4 text-primary" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getMovementColor = (type) => {
    switch (type) {
      case "purchase":
        return "text-success"
      case "sales":
        return "text-destructive"
      case "adjustment":
        return "text-blue-600"
      case "customerReturn":
      case "supplierReturn":
        return "text-warning"
      case "opname":
        return "text-primary"
      default:
        return "text-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          Pergerakan Stock Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="min-h-[200px]" />
        ) : (
          <>
            <div className="space-y-4">
              {data.map((movement) => (
                <Card>
                  <CardContent
                    key={movement._id}
                    className="flex items-center justify-between bg-primary-foreground rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getMovementIcon(movement.movementType)}
                      <div>
                        <p className="font-medium">{movement.product.name}</p>
                        <p className="text-sm">{movement.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${getMovementColor(
                          movement.movementType
                        )}`}
                      >
                        {movement.finalStock - movement.initialStock}
                      </p>
                      <p className="text-xs">
                        {formatDate(movement.timestamp)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/stock/history" passHref>
              <Button variant="outline" className="w-full mt-4">
                <History className="h-4 w-4 mr-2" />
                Lihat Riwayat Lengkap
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default LatestMovementStocks
