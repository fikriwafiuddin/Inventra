"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  Archive,
  Calendar,
  CheckCircle,
  Clock,
  Loader2Icon,
  Package,
  TrendingUp,
  XCircle,
} from "lucide-react"
import { useDetailProduct } from "@/services/hooks/product-hook"
import { formatCurrency } from "@/lib/formatters"

function DetailsTab({ sku }) {
  const { isPending, data: product, error } = useDetailProduct(sku)

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        variant: "destructive",
        icon: XCircle,
      }
    } else if (stock <= 5) {
      return {
        label: "Low Stock",
        variant: "secondary",
        icon: AlertCircle,
      }
    } else {
      return {
        label: "In Stock",
        variant: "default",
        icon: CheckCircle,
      }
    }
  }

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
      </div>
    )
  }

  const stockStatus = getStockStatus(product.stock)
  const StockIcon = stockStatus.icon

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                <Image
                  src={product.image.url}
                  alt={product.name}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  fill
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category.name}</Badge>
              <Badge variant="outline" className="font-mono">
                {product.sku}
              </Badge>
              <Badge
                variant={stockStatus.variant}
                className="flex items-center gap-1"
              >
                <StockIcon className="h-3 w-3" />
                {stockStatus.label}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          <Separator />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Stock Available
                </CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.stock}</div>
                <p className="text-xs text-muted-foreground">
                  {product.stock > 0 ? "units available" : "out of stock"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sold
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.sold}</div>
                <p className="text-xs text-muted-foreground">units sold</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          {/* Timestamp Information (Future) */}
          {(product.createdAt || product.updatedAt) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {product.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created:{" "}
                      {new Date(product.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                )}
                {product.updatedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Last Updated:{" "}
                      {new Date(product.updatedAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" size="lg">
              Edit Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsTab
