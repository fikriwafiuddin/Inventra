import { DataTable } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import opnames from "@/data/opname-data"
import { DownloadIcon, RefreshCwIcon } from "lucide-react"
import columns from "./columns"

async function DetailOpnamePage({ params }) {
  const { id } = await params
  const opname = opnames.find((value) => value._id == id)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            // onClick={() => setCurrentView("list")}
            className="mb-2"
          >
            ← Kembali ke Daftar Sesi
          </Button>
          <h1 className="text-3xl font-bold">Detail Sesi Stock Opname</h1>
          <p className="text-muted-foreground">{opname?.name}</p>
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
                <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                <p className="font-medium">{opname?.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Selesai</p>
                <p className="font-medium">{opname?.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    opname.status === "completed" ? "success" : "destructive"
                  }
                >
                  {opname.status}
                </Badge>
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
                <p className="text-sm text-muted-foreground">
                  Total Produk Dihitung
                </p>
                <p className="text-2xl font-bold">{opname?.items.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Produk dengan Selisih
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {opname?.items.filter((p) => p.difference !== 0).length}
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
              <p className="text-sm text-muted-foreground">
                Nilai Selisih Keseluruhan
              </p>
              <p
                className={`text-2xl font-bold ${
                  opname?.totalDifference < 0
                    ? "text-destructive"
                    : "text-success"
                }`}
              >
                Rp {opname?.totalDifference?.toLocaleString("id-ID") || "0"}
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
                // onClick={adjustStockAutomatically}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Sesuaikan Stok Otomatis
              </Button>
              <Button
                //   onClick={exportReport}
                variant="outline"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
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

          {/* <Table>
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
          </Table> */}
          <DataTable data={opname.items} columns={columns} />
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailOpnamePage
