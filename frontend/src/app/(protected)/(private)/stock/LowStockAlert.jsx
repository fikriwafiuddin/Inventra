import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetStockAlert } from "@/services/hooks/statistic-hook"
import { AlertTriangleIcon, EyeIcon } from "lucide-react"
import Link from "next/link"

function LowStockAlert() {
  const { isPending, data } = useGetStockAlert(1, 4)
  const getStockStatus = (current, min) => {
    if (current === 0)
      return { status: "Habis", color: "bg-red-100 text-destructive" }
    if (current <= min)
      return { status: "Rendah", color: "bg-yellow-100 text-warning" }
    return { status: "Normal", color: "bg-green-100 text-success" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangleIcon className="h-5 w-5 text-warning" />
          Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="min-h-[200px]" />
        ) : (
          <>
            <div className="space-y-4">
              {data.products.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.minStock)
                return (
                  <Card key={item._id}>
                    <CardContent className="flex items-center justify-between rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">{item.category.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Stock: {item.stock} / Min: {item.minStock}
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
            <Link href="/stock/alert" passHref>
              <Button variant="outline" className="w-full mt-4">
                <EyeIcon className="h-4 w-4 mr-2" />
                Lihat Semua Alert
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default LowStockAlert
