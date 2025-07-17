import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  Archive,
  BanknoteArrowUpIcon,
  BoxIcon,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  TrendingUp,
  XCircle,
} from "lucide-react"

const products = [
  {
    _id: 12,
    sku: "PSU-001",
    name: "Corsair CV55 550 Watt 80 Plus",
    image: "/products/Corsair CV550 550 Watt 80 Plus.jpg",
    price: 700000,
    stock: 5,
    sold: 100,
    description: "This is a description of the product.",
    category: "PSU",
  },
  {
    _id: 13,
    sku: "MOB-001",
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    price: 1600000,
    stock: 10,
    sold: 90,
    description: "This is a description of the product.",
    category: "Motherboard",
  },
  {
    _id: 14,
    sku: "GPU-001",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    price: 5000000000,
    stock: 15,
    sold: 85,
    description: "This is a description of the product.",
    category: "GPU",
  },
  {
    _id: 15,
    sku: "RAM-001",
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    price: 400000,
    stock: 3,
    sold: 73,
    description: "This is a description of the product.",
    category: "ram",
  },
  {
    _id: 16,
    sku: "MOU-001",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    price: 150000,
    stock: 30,
    sold: 65,
    description: "This is a description of the product.",
    category: "mouse",
  },
  {
    _id: 12,
    sku: "PSU-001",
    name: "Corsair CV55 550 Watt 80 Plus",
    image: "/products/Corsair CV550 550 Watt 80 Plus.jpg",
    price: 700000,
    stock: 5,
    sold: 100,
    description: "This is a description of the product.",
    category: "psu",
  },
  {
    _id: 13,
    sku: "MOB-001",
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    price: 1600000,
    stock: 10,
    sold: 90,
    description: "This is a description of the product.",
    category: "Motherboard",
  },
  {
    _id: 14,
    sku: "GPU-001",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    price: 5000000000,
    stock: 15,
    sold: 85,
    description: "This is a description of the product.",
    category: "gpu",
  },
  {
    _id: 15,
    sku: "RAM-001",
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    price: 400000,
    stock: 3,
    sold: 73,
    description: "This is a description of the product.",
    category: "ram",
  },
  {
    _id: 16,
    sku: "MOU-001",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    price: 150000,
    stock: 30,
    sold: 65,
    description: "This is a description of the product.",
    category: "mouse",
  },
]

function DetailsTab({ sku }) {
  const product = products.find((value) => value.sku === sku)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

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
                  src={product.image}
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
              <Badge variant="outline">{product.category}</Badge>
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
              {formatPrice(product.price)}
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
          {(product.createdAt || product.lastUpdated) && (
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
                {product.lastUpdated && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Last Updated:{" "}
                      {new Date(product.lastUpdated).toLocaleDateString(
                        "id-ID"
                      )}
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
