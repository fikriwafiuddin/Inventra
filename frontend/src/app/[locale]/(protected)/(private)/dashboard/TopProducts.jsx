"use client"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTopProducts } from "@/services/hooks/statistic-hook"
import Image from "next/image"

function TopProducts({ translations }) {
  const { isPending, data: topProducts } = useGetTopProducts()
  return (
    <div className="bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">
        {translations.title}
      </h3>
      <div className="flex flex-col gap-2">
        {isPending ? (
          <Skeleton className="h-[200px]" />
        ) : (
          topProducts?.map((product) => (
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
    </div>
  )
}

export default TopProducts
