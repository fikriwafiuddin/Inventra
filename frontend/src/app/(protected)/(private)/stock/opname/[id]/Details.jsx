import { DownloadIcon, RefreshCwIcon } from "lucide-react"
import columns from "./columns"
import { DataTable } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/formatters"

function Details({ opname }) {
  const totalDifferenceValue = opname?.items.reduce(
    (acc, item) => acc + (item.systemStock - item.physicalStock) * item.price,
    0
  )

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Stock Opname Session Details</h1>
        <p className="text-muted-foreground">{opname?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(opname?.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Date</p>
                <p className="font-medium">{formatDate(opname?.endDate)}</p>
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
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Products Calculated
                </p>
                <p className="text-2xl font-bold">{opname?.items.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Products with Difference
                </p>
                <p className="text-2xl font-bold text-warning">
                  {opname?.items.filter((p) => p.difference !== 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Difference in Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Overall Difference Value
              </p>
              <p
                className={`text-2xl font-bold ${
                  totalDifferenceValue < 0 ? "text-destructive" : "text-success"
                }`}
              >
                {formatCurrency(totalDifferenceValue)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Stock Difference Report
            {/* <div className="flex gap-2">
              <Button
              onClick={adjustStockAutomatically}
              className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Sesuaikan Stok Otomatis
              </Button>
              <Button
                  onClick={exportReport}
                variant="outline"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Ekspor Laporan
              </Button>
            </div> */}
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

          <DataTable data={opname.items} columns={columns} />
        </CardContent>
      </Card>
    </>
  )
}

export default Details
