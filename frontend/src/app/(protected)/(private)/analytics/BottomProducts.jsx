import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTopProducts } from "@/services/hooks/statistic-hook"
import Image from "next/image"

function BottomProducts() {
  const { isPending, data: bottomProducts } = useGetTopProducts()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Bottom 5 Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {isPending ? (
            <Skeleton className="h-[200px]" />
          ) : (
            bottomProducts?.map((product) => (
              <Card
                key={product._id}
                className="flex-row items-center justify-between gap-1 p-2 2xl:p-4"
              >
                <div className="size-12 rounded-sm overflow-hidden relative">
                  <Image
                    src={product.image.url}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BottomProducts
