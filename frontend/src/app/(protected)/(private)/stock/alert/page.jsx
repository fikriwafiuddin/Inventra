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
import { useGetStockAlert } from "@/services/hooks/statistic-hook"
import { Loader2Icon } from "lucide-react"
import columns from "./columns"
import AppPagination from "@/components/AppPagination"
import { useState } from "react"

function AlertPage() {
  const [page, setPage] = useState(1)
  const { isPending, data, error } = useGetStockAlert(page)

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Alert</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="text-destructive text-center mt-4">
          {error.response?.data.message ||
            error.message ||
            "An error occurred while fetching categories."}
        </div>
      )}

      {data && <DataTable data={data.products} columns={columns} />}
      {data && data?.totalPages > 1 && (
        <AppPagination
          currentPage={page}
          totalPages={data?.totalPages}
          pageSize={data?.limit}
          totalData={data?.totalProducts}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

export default AlertPage
