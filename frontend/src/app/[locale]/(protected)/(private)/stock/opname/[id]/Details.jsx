import { DownloadIcon, RefreshCwIcon } from "lucide-react"
import columns from "./columns"
import { DataTable } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/formatters"

function Details({ opname, translations }) {
  const totalDifferenceValue = opname?.items.reduce(
    (acc, item) => acc + (item.systemStock - item.physicalStock) * item.price,
    0
  )

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">{translations.details.title}</h1>
        <p className="text-muted-foreground">{opname?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {translations.details.sessionInfo}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  {translations.details.startDate}
                </p>
                <p className="font-medium">{formatDate(opname?.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {translations.details.endDate}
                </p>
                <p className="font-medium">{formatDate(opname?.endDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {translations.details.status}
                </p>
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
            <CardTitle className="text-lg">
              {translations.details.statistics}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  {translations.details.totalProducts}
                </p>
                <p className="text-2xl font-bold">{opname?.items.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {translations.details.productsWithDifference}
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
            <CardTitle className="text-lg">
              {translations.details.totalDifferenceValue}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {translations.details.overallDifference}
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
            {translations.details.reportTitle}
            <div className="flex gap-2">
              <Button>
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                {translations.details.adjustStock}
              </Button>
              <Button variant="outline">
                <DownloadIcon className="w-4 h-4 mr-2" />
                {translations.details.exportReport}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={opname.items}
            columns={columns(translations.table)}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default Details
