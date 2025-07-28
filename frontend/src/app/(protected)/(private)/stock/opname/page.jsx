"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// Table components implemented inline since @/components/ui/table is not available
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Scan,
  Save,
  CheckCircle,
  Download,
  RefreshCw,
  Calendar,
  Package,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Table components
const Table = ({ children, ...props }) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
)

const TableHeader = ({ children, ...props }) => (
  <thead className="[&_tr]:border-b" {...props}>
    {children}
  </thead>
)

const TableBody = ({ children, ...props }) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
)

const TableRow = ({ children, ...props }) => (
  <tr
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  >
    {children}
  </tr>
)

const TableHead = ({ children, ...props }) => (
  <th
    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    {...props}
  >
    {children}
  </th>
)

const TableCell = ({ children, ...props }) => (
  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
)

const StockOpnamePage = () => {
  const [currentView, setCurrentView] = useState("list") // 'list', 'new-session', 'counting', 'detail'
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Stock Opname Akhir Tahun 2024",
      startDate: "2024-12-30",
      endDate: "2024-12-31",
      status: "Completed",
      productsCount: 150,
      totalDifference: -25000,
    },
    {
      id: 2,
      name: "Stock Opname Bulanan Januari",
      startDate: "2025-01-31",
      endDate: null,
      status: "InProgress",
      productsCount: 85,
      totalDifference: null,
    },
  ])

  const [newSessionName, setNewSessionName] = useState("")
  const [currentSession, setCurrentSession] = useState(null)
  const [productSearch, setProductSearch] = useState("")
  const [physicalCount, setPhysicalCount] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Sample data
  const sampleProducts = [
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      barcode: "1234567890",
      systemStock: 15,
      price: 15000000,
    },
    {
      id: 2,
      name: "Mouse Wireless Logitech",
      barcode: "0987654321",
      systemStock: 50,
      price: 350000,
    },
    {
      id: 3,
      name: "Keyboard Mechanical RGB",
      barcode: "1122334455",
      systemStock: 25,
      price: 1200000,
    },
  ]

  const [countedProducts, setCountedProducts] = useState([
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      systemStock: 15,
      physicalStock: 14,
      difference: -1,
      price: 15000000,
    },
  ])

  const startNewSession = () => {
    if (!newSessionName.trim()) return

    const newSession = {
      id: sessions.length + 1,
      name: newSessionName,
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      status: "InProgress",
      productsCount: 0,
      totalDifference: null,
    }

    setSessions([...sessions, newSession])
    setCurrentSession(newSession)
    setNewSessionName("")
    setCurrentView("counting")
  }

  const addCountedProduct = () => {
    if (!selectedProduct || !physicalCount) return

    const physicalStockNum = parseInt(physicalCount)
    const difference = physicalStockNum - selectedProduct.systemStock

    const newCountedProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      systemStock: selectedProduct.systemStock,
      physicalStock: physicalStockNum,
      difference: difference,
      price: selectedProduct.price,
    }

    setCountedProducts([...countedProducts, newCountedProduct])
    setSelectedProduct(null)
    setPhysicalCount("")
    setProductSearch("")
  }

  const completeSession = () => {
    const updatedSessions = sessions.map((session) =>
      session.id === currentSession.id
        ? {
            ...session,
            status: "Completed",
            endDate: new Date().toISOString().split("T")[0],
            productsCount: countedProducts.length,
            totalDifference: countedProducts.reduce(
              (sum, product) => sum + product.difference * product.price,
              0
            ),
          }
        : session
    )

    setSessions(updatedSessions)
    setCurrentView("detail")
  }

  const adjustStockAutomatically = () => {
    // alert(
    //   "Stok telah disesuaikan secara otomatis berdasarkan hasil stock opname. Semua perubahan telah dicatat dalam riwayat stok."
    // )
  }

  const exportReport = () => {
    // alert("Laporan selisih stok telah diekspor ke file Excel.")
  }

  const renderSessionsList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stock Opname</h1>
          <p className="text-gray-600">
            Kelola sesi stock opname dan penghitungan stok fisik
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Mulai Sesi Stock Opname Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mulai Sesi Stock Opname Baru</DialogTitle>
              <DialogDescription>
                Buat sesi stock opname baru untuk memulai penghitungan fisik
                stok
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="session-name">Nama Sesi</Label>
                <Input
                  id="session-name"
                  placeholder="Contoh: Stock Opname Akhir Tahun 2025"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                />
              </div>
              <Button
                onClick={startNewSession}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!newSessionName.trim()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mulai Sekarang
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Daftar Sesi Stock Opname
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Sesi</TableHead>
                <TableHead>Tanggal Mulai</TableHead>
                <TableHead>Tanggal Selesai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jumlah Produk</TableHead>
                <TableHead>Total Selisih</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {session.startDate}
                    </div>
                  </TableCell>
                  <TableCell>{session.endDate || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        session.status === "Completed" ? "default" : "secondary"
                      }
                      className={
                        session.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.productsCount}</TableCell>
                  <TableCell>
                    {session.totalDifference !== null ? (
                      <span
                        className={
                          session.totalDifference < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        Rp {session.totalDifference.toLocaleString("id-ID")}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentSession(session)
                        setCurrentView(
                          session.status === "InProgress"
                            ? "counting"
                            : "detail"
                        )
                      }}
                    >
                      {session.status === "InProgress"
                        ? "Lanjutkan"
                        : "Lihat Detail"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderCountingView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            onClick={() => setCurrentView("list")}
            className="mb-2"
          >
            ← Kembali ke Daftar Sesi
          </Button>
          <h1 className="text-3xl font-bold">Penghitungan Stock Opname</h1>
          <p className="text-gray-600">{currentSession?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Sesi dimulai: {currentSession?.startDate}
          </p>
          <Badge className="mt-1 bg-blue-100 text-blue-800">
            Sedang Berlangsung
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Input Penghitungan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-search">
                  Cari Produk / Scan Barcode
                </Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="product-search"
                    placeholder="Ketik nama atau scan barcode..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {productSearch && (
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
                        onClick={() => setSelectedProduct(product)}
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
              )}

              {selectedProduct && (
                <>
                  <div>
                    <Label htmlFor="physical-count">
                      Jumlah Fisik Dihitung
                    </Label>
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
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!physicalCount}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah ke Penghitungan
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Progress Penghitungan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Produk Dihitung</span>
                  <span>
                    {countedProducts.length} / {sampleProducts.length}
                  </span>
                </div>
                {/* <Progress
                  value={(countedProducts.length / sampleProducts.length) * 100}
                /> */}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Save className="w-4 h-4 mr-1" />
                  Simpan Sementara
                </Button>
                <Button
                  onClick={completeSession}
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={countedProducts.length === 0}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Stok Sistem</TableHead>
                    <TableHead>Stok Fisik</TableHead>
                    <TableHead>Selisih</TableHead>
                    <TableHead>Nilai Selisih</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.systemStock}</TableCell>
                      <TableCell>{product.physicalStock}</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.difference < 0
                              ? "text-red-600"
                              : product.difference > 0
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          {product.difference > 0 ? "+" : ""}
                          {product.difference}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            product.difference < 0
                              ? "text-red-600"
                              : product.difference > 0
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          Rp{" "}
                          {(product.difference * product.price).toLocaleString(
                            "id-ID"
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderDetailView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            onClick={() => setCurrentView("list")}
            className="mb-2"
          >
            ← Kembali ke Daftar Sesi
          </Button>
          <h1 className="text-3xl font-bold">Detail Sesi Stock Opname</h1>
          <p className="text-gray-600">{currentSession?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Sesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Tanggal Mulai</p>
                <p className="font-medium">{currentSession?.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Selesai</p>
                <p className="font-medium">{currentSession?.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-800">Selesai</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Total Produk Dihitung</p>
                <p className="text-2xl font-bold">{countedProducts.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Produk dengan Selisih</p>
                <p className="text-2xl font-bold text-orange-600">
                  {countedProducts.filter((p) => p.difference !== 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Selisih Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Nilai Selisih Keseluruhan</p>
              <p
                className={`text-2xl font-bold ${
                  currentSession?.totalDifference < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                Rp{" "}
                {currentSession?.totalDifference?.toLocaleString("id-ID") ||
                  "0"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Laporan Selisih Stok
            <div className="flex gap-2">
              <Button
                onClick={adjustStockAutomatically}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sesuaikan Stok Otomatis
              </Button>
              <Button onClick={exportReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Ekspor Laporan
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Alert className="mb-4">
            <AlertDescription>
              Gunakan "Sesuaikan Stok Otomatis" untuk mengupdate stok sistem
              berdasarkan hasil penghitungan fisik. Semua perubahan akan dicatat
              dalam riwayat stok.
            </AlertDescription>
          </Alert> */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Stok Sistem</TableHead>
                <TableHead>Stok Fisik</TableHead>
                <TableHead>Selisih Kuantitas</TableHead>
                <TableHead>Nilai Selisih</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.systemStock}</TableCell>
                  <TableCell>{product.physicalStock}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.difference < 0
                          ? "text-red-600"
                          : product.difference > 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      {product.difference > 0 ? "+" : ""}
                      {product.difference}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.difference < 0
                          ? "text-red-600"
                          : product.difference > 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      Rp{" "}
                      {(product.difference * product.price).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.difference === 0 ? "default" : "destructive"
                      }
                      className={
                        product.difference === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {product.difference === 0 ? "Sesuai" : "Ada Selisih"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Opname</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {currentView === "list" && renderSessionsList()}
      {currentView === "counting" && renderCountingView()}
      {currentView === "detail" && renderDetailView()}
    </div>
  )
}

export default StockOpnamePage
