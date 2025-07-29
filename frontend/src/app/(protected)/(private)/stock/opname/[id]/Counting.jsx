"use client"

import { DataTable } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CheckCircleIcon,
  PlusIcon,
  SaveIcon,
  ScanIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import columns from "./columns"
import { Button } from "@/components/ui/button"
import products from "@/data/products-data"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Progress } from "@/components/ui/progress"
import { se } from "date-fns/locale"

function Counting({ opname }) {
  const [search, setSearch] = useState("")
  const [searchedProducts, setSearchedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [items, setItems] = useState(opname.items || [])
  const [physicalCount, setPhysicalCount] = useState(1)
  const debouncedSearchTerm = useDebounce(search, 500)
  const totalProducts = products.length

  useEffect(() => {
    const searchProducts = () => {
      if (!debouncedSearchTerm) {
        setSearchedProducts([])
        return
      }

      setSearchedProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    }

    searchProducts()
  }, [debouncedSearchTerm])

  const addCountedProduct = () => {
    if (!selectedProduct) return

    const existingItem = items.find((item) => item._id === selectedProduct._id)
    if (existingItem) {
      // Update existing item
      setItems(
        items.map((item) =>
          item._id === selectedProduct._id
            ? {
                ...item,
                physicalStock: physicalCount || 1,
                difference: (item.systemStock || 0) - (physicalCount || 1),
              }
            : item
        )
      )
    } else {
      // Add new item
      setItems([
        ...items,
        {
          _id: selectedProduct._id,
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

  return (
    <div className="space-y-4">
      {/* COUNT DIALOG */}
      <Dialog open={selectedProduct} onOpenChange={setSelectedProduct}>
        <DialogContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="physical-count">Jumlah Fisik Dihitung</Label>
              <Input
                id="physical-count"
                type="number"
                placeholder="Masukkan jumlah fisik..."
                value={physicalCount}
                onChange={(e) => setPhysicalCount(e.target.value)}
              />
            </div>
            <Button
              onClick={addCountedProduct}
              // className="w-full bg-green-600 hover:bg-green-700"
              disabled={!physicalCount}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Tambah ke Penghitungan
            </Button>
          </DialogContent>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Penghitungan Stock Opname</h1>
          <p className="text-muted-foreground">{opname?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Sesi dimulai: {opname?.startDate}
          </p>
          <Badge variant="info">Sedang Berlangsung</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanIcon className="w-5 h-5" />
              Input Penghitungan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div className="space-y-2">
              <Label htmlFor="product-search">Cari Produk</Label>
              <div className="relative">
                <SearchIcon className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="product-search"
                  placeholder="Ketik nama atau scan barcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {search && (
              <div className="absolute left-0 right-0 z-20">
                {searchedProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`p-3 border cursor-pointer hover:bg-secondary bg-primary-foreground ${
                      selectedProduct?._id === product._id
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stok Sistem: {product.stock}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* {productSearch && (
                <div className="space-y-2">
                  <Label>Hasil Pencarian:</Label>
                  {sampleProducts
                    .filter(
                      (product) =>
                        product.name
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()) ||
                        product.barcode.includes(productSearch)
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                          selectedProduct?.id === product.id
                            ? "border-blue-500 bg-blue-50"
                            : ""
                        }`}
                        // onClick={() => setSelectedProduct(product)}
                      >
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          Stok Sistem: {product.systemStock}
                        </p>
                        <p className="text-sm text-gray-500">
                          Barcode: {product.barcode}
                        </p>
                      </div>
                    ))}
                </div>
              )} */}

            {/* {selectedProduct && (
                <>
                  <div>
                    <Label htmlFor="physical-count">
                      Jumlah Fisik Dihitung
                    </Label>
                    <Input
                      id="physical-count"
                      type="number"
                      placeholder="Masukkan jumlah fisik..."
                      //   value={physicalCount}
                      //   onChange={(e) => setPhysicalCount(e.target.value)}
                    />
                  </div>
                  <Button
                    // onClick={addCountedProduct}
                    className="w-full bg-green-600 hover:bg-green-700"
                    // disabled={!physicalCount}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah ke Penghitungan
                  </Button>
                </>
              )} */}
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Progress Penghitungan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Produk Dihitung</span>
                <span>
                  {opname.items.length} / {totalProducts}
                </span>
              </div>
              <Progress value={(opname.items.length / products.length) * 100} />
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <SaveIcon className="w-4 h-4 mr-1" />
                Simpan Sementara
              </Button>
              <Button
                //   onClick={completeSession}
                size="sm"
                className="flex-1"
                //   disabled={countedProducts.length === 0}
              >
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Selesaikan Sesi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Produk yang Sudah Dihitung</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={items} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Counting
