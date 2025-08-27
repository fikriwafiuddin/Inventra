"use client"

import { DataTable } from "@/components/DataTable"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useGetAllStockMovements } from "@/services/hooks/stockMovement-hook"
import { Loader2Icon } from "lucide-react"
import columns from "./columns"

function HistoryStockPage() {
  const { isPending, error, data: stockMovements } = useGetAllStockMovements()

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>History</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">History</h1>
        </div>
        <p>Product management history</p>
      </div>

      {error && (
        <div className="text-destructive text-center mt-4">
          {error.response?.data.message ||
            error.message ||
            "An error occurred while fetching stock movements."}
        </div>
      )}

      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {stockMovements && <DataTable data={stockMovements} columns={columns} />}
    </div>
  )
}

export default HistoryStockPage
