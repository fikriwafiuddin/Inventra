import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const topProducts = [
  {
    _id: 12,
    name: "Corsair CV55 550 Watt 80 Plus",
    image: "/products/Corsair CV550 550 Watt 80 Plus.jpg",
    sold: 100,
  },
  {
    _id: 13,
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    sold: 90,
  },
  {
    _id: 14,
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    sold: 85,
  },
  {
    _id: 15,
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    sold: 73,
  },
  {
    _id: 16,
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    sold: 65,
  },
]

function TopProducts() {
  return (
    <div className="bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">Top 5 Products</h3>
      <div className="flex flex-col gap-2">
        {topProducts.map((product) => (
          <Card
            key={product._id}
            className="flex-row items-center justify-between gap-1 p-2 2xl:p-4"
          >
            <div className="size-12 rounded-sm overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-0 flex-1">
              <CardTitle className="line-clamp-1 text-xs">
                {product.name}
              </CardTitle>
            </CardContent>
            <CardFooter className="p-1">
              <span className="line-clamp-1 text-sm">{product.sold}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TopProducts
