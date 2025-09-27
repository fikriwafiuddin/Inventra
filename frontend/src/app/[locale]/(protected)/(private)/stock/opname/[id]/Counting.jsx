"use client"

import { DataTable } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CheckCircleIcon,
  Loader2Icon,
  PlusIcon,
  SaveIcon,
  ScanIcon,
  SearchIcon,
} from "lucide-react"
import columns from "./columns"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useSearchProducts } from "@/services/hooks/product-hook"
import { useState } from "react"
import { formatDate } from "@/lib/formatters"
import { useGetStatisticProduct } from "@/services/hooks/statistic-hook"
import { Progress } from "@/components/ui/progress"
import { useUpdateOpname } from "@/services/hooks/opname-hook"
import { useRouter } from "next/navigation"

function Counting({ opname, translations, tableTranslations }) {
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [items, setItems] = useState(opname.items || [])
  const [physicalCount, setPhysicalCount] = useState(1)
  const { isPending: searching, data: products } = useSearchProducts(search)
  const { isPending: fetching, data: statistic } = useGetStatisticProduct()
  const { isPending: updating, mutate: update } = useUpdateOpname()
  const router = useRouter()

  const addCountedProduct = () => {
    if (!selectedProduct) return
    const existingItem = items.find((item) => item.id === selectedProduct._id)
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === selectedProduct._id
            ? {
                ...item,
                physicalStock: physicalCount || 1,
                difference: (item.systemStock || 0) - (physicalCount || 1),
              }
            : item
        )
      )
    } else {
      setItems([
        ...items,
        {
          id: selectedProduct._id,
          sku: selectedProduct.sku,
          name: selectedProduct.name,
          systemStock: selectedProduct.stock,
          physicalStock: physicalCount || 1,
          difference: (selectedProduct.stock || 0) - (physicalCount || 1),
          price: selectedProduct.price,
        },
      ])
    }
    setSelectedProduct(null)
  }

  const handleSave = () => {
    const data = {
      id: opname._id,
      items: items.map((item) => ({
        id: item.id,
        physicalStock: item.physicalStock,
      })),
      status: "incomplete",
    }
    update(data, { onSuccess: () => router.push("/stock/opname") })
  }

  const completeSession = () => {
    const data = {
      id: opname._id,
      items: items.map((item) => ({
        id: item.id,
        physicalStock: item.physicalStock,
      })),
      status: "completed",
    }
    update(data, { onSuccess: () => router.push("/stock/opname") })
  }

  return (
    <div className="space-y-4">
      {/* COUNT DIALOG */}
      <Dialog open={selectedProduct} onOpenChange={setSelectedProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="physical-count">{translations.dialog.label}</Label>
            <Input
              id="physical-count"
              type="number"
              placeholder={translations.dialog.placeholder}
              value={physicalCount}
              onChange={(e) => setPhysicalCount(e.target.value)}
            />
          </div>
          <Button onClick={addCountedProduct} disabled={!physicalCount}>
            <PlusIcon className="w-4 h-4 mr-2" />
            {translations.dialog.addButton}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{translations.title}</h1>
          <p className="text-muted-foreground">{opname?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {translations.sessionStarted}: {formatDate(opname?.startDate)}
          </p>
          <Badge variant="info">{translations.inProgress}</Badge>
        </div>
      </div>

      {/* Input & Progress */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanIcon className="w-5 h-5" />
              {translations.countInput}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div className="space-y-2">
              <Label htmlFor="product-search">
                {translations.searchProduct}
              </Label>
              <div className="relative">
                <SearchIcon className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="product-search"
                  placeholder={translations.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {search && (
              <div className="absolute left-0 right-0 z-20">
                {searching && (
                  <div className="bg-primary-foreground w-full py-2">
                    <Loader2Icon className="animate-spin mx-auto" />
                  </div>
                )}
                {products?.map((product) => (
                  <div
                    key={product._id}
                    className="p-3 border cursor-pointer hover:bg-secondary bg-primary-foreground"
                    onClick={() => {
                      setSearch("")
                      setSelectedProduct(product)
                    }}
                  >
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {translations.systemStock}: {product.stock}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{translations.progressTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fetching ? (
                <Loader2Icon />
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span>{translations.countedProducts}</span>
                    <span>
                      {items.length} / {statistic.totalProduct}
                    </span>
                  </div>
                  <Progress
                    value={(items.length / statistic.totalProduct) * 100}
                  />
                </>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSave}
                disabled={updating}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {updating ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <>
                    <SaveIcon className="w-4 h-4 mr-1" />
                    {translations.saveTemp}
                  </>
                )}
              </Button>
              <Button
                onClick={completeSession}
                size="sm"
                className="flex-1"
                disabled={items.length === 0 || updating}
              >
                {updating ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    {translations.completeSession}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Counted List */}
      <Card>
        <CardHeader>
          <CardTitle>{translations.countedList}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns(tableTranslations)} data={items} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Counting
