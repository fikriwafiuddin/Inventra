"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, ArrowLeft, Check, FileText } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HelpText from "./HelpText"

// Mock data untuk transaksi penjualan
const mockTransactions = [
  {
    id: "TXN-001",
    invoice: "INV-12345",
    date: "2025-01-20",
    total: 450000,
    items: [
      {
        id: "ITEM-001",
        productId: "PROD-001",
        productName: "Kemeja Putih Premium",
        sku: "KMJ-001",
        quantity: 2,
        price: 125000,
        subtotal: 250000,
      },
      {
        id: "ITEM-002",
        productId: "PROD-002",
        productName: "Celana Jeans Slim Fit",
        sku: "CLN-002",
        quantity: 1,
        price: 200000,
        subtotal: 200000,
      },
    ],
  },
  {
    id: "TXN-002",
    invoice: "INV-12346",
    date: "2025-01-19",
    total: 375000,
    items: [
      {
        id: "ITEM-003",
        productId: "PROD-003",
        productName: "Sepatu Sneakers",
        sku: "SPT-001",
        quantity: 1,
        price: 375000,
        subtotal: 375000,
      },
    ],
  },
]

const CustomerReturnPage = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [returnItems, setReturnItems] = useState([])
  const [notes, setNotes] = useState("")

  const handleSearch = () => {
    let foundTransaction = mockTransactions.find((t) =>
      t.invoice.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (foundTransaction) {
      setSelectedTransaction(foundTransaction)
      // Initialize return items dengan default values
      const initialReturnItems = foundTransaction.items.map((item) => ({
        ...item,
        returnQuantity: 0,
        condition: "",
        returnPrice: item.price,
        returnSubtotal: 0,
      }))
      setReturnItems(initialReturnItems)
    } else {
      setSelectedTransaction(null)
      setReturnItems([])
      toast.error("Transaksi tidak ditemukan")
    }
  }

  const updateReturnItem = (itemId, field, value) => {
    setReturnItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate subtotal jika quantity atau price berubah
          if (field === "returnQuantity" || field === "returnPrice") {
            updatedItem.returnSubtotal =
              updatedItem.returnQuantity * updatedItem.returnPrice
          }

          return updatedItem
        }
        return item
      })
    )
  }

  const calculateTotalRefund = () => {
    return returnItems.reduce((total, item) => total + item.returnSubtotal, 0)
  }

  const getTotalReturnQuantity = () => {
    return returnItems.reduce((total, item) => total + item.returnQuantity, 0)
  }

  const handleSubmitReturn = () => {
    const returnData = {
      originalTransaction: selectedTransaction,
      returnItems: returnItems.filter((item) => item.returnQuantity > 0),
      totalRefund: calculateTotalRefund(),
      notes,
      returnDate: new Date().toISOString(),
    }

    toast.success("Retur berhasil diproses!")

    // Reset form
    setSelectedTransaction(null)
    setReturnItems([])
    setNotes("")
    setSearchValue("")
  }

  const isValidReturn = () => {
    return (
      getTotalReturnQuantity() > 0 &&
      returnItems
        .filter((item) => item.returnQuantity > 0)
        .every((item) => item.condition)
    )
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cutomer Returns</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">Retur Pelanggan</h1>
        </div>
        <p>Proses pengembalian barang dari pelanggan</p>
      </div>

      {/* Search Transaction Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Pencarian Transaksi Penjualan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="searchValue">Order Id</Label>
              <Input
                id="searchValue"
                placeholder="Masukkan order id..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Cari Transaksi
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      {selectedTransaction && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ringkasan Transaksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2">Informasi Transaksi</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Invoice:</span>{" "}
                    {selectedTransaction.invoice}
                  </p>
                  <p>
                    <span className="font-medium">Tanggal:</span>{" "}
                    {selectedTransaction.date}
                  </p>
                  <p>
                    <span className="font-medium">Total Transaksi:</span> Rp{" "}
                    {selectedTransaction.total.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Statistik</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Jumlah Item:</span>{" "}
                    {selectedTransaction.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Total Unit:</span>{" "}
                    {selectedTransaction.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Items Form */}
      {selectedTransaction && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Daftar Item untuk Retur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto border rounded-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Qty Dibeli</TableHead>
                    <TableHead>Qty Retur</TableHead>
                    <TableHead>Kondisi</TableHead>
                    <TableHead>Harga Retur</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            SKU: {item.sku}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.quantity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={item.returnQuantity}
                          onChange={(e) =>
                            updateReturnItem(
                              item.id,
                              "returnQuantity",
                              Math.min(
                                parseInt(e.target.value) || 0,
                                item.quantity
                              )
                            )
                          }
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.condition}
                          onValueChange={(value) =>
                            updateReturnItem(item.id, "condition", value)
                          }
                          disabled={item.returnQuantity === 0}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Pilih kondisi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="good">
                              Baik/Layak Jual
                            </SelectItem>
                            <SelectItem value="damaged">Rusak</SelectItem>
                            <SelectItem value="defective">Cacat</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.returnPrice}
                          onChange={(e) =>
                            updateReturnItem(
                              item.id,
                              "returnPrice",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-32"
                          disabled={item.returnQuantity === 0}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Rp {item.returnSubtotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Summary */}
      {selectedTransaction && getTotalReturnQuantity() > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ringkasan Pengembalian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Total Pengembalian</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Total Item Diretur:</span>{" "}
                      {getTotalReturnQuantity()} unit
                    </p>
                    <p className="text-lg font-bold">
                      Total Refund: Rp {calculateTotalRefund().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan mengenai retur ini..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {selectedTransaction && (
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedTransaction(null)
              setReturnItems([])
              setNotes("")
              setSearchValue("")
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Batal
          </Button>
          <Button
            onClick={handleSubmitReturn}
            disabled={!isValidReturn()}
            className="min-w-32"
          >
            <Check className="h-4 w-4 mr-2" />
            Proses Retur
          </Button>
        </div>
      )}

      {/* Help Text */}
      {!selectedTransaction && <HelpText />}
    </div>
  )
}

export default CustomerReturnPage
