"use client"

import { useGetAllSuppliers } from "@/services/hooks/supplier-hook"
import { Loader2Icon } from "lucide-react"
import columnSuppliers from "./columnsSuppliers"
import { DataTable } from "@/components/DataTable"
import { useState } from "react"
import AppPagination from "@/components/AppPagination"

function SuppliersTable() {
  const [page, setPage] = useState(1)
  const { isError, isPending, data } = useGetAllSuppliers(page)

  if (isError) {
    return (
      <div className="text-destructive text-center mt-4">
        An error occurred while fetching suppliers.
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  return (
    <>
      <DataTable data={data.suppliers} columns={columnSuppliers} />
      {data.totalPages > 1 && (
        <AppPagination
          currentPage={page}
          totalPage={data.totalPages}
          pageSize={10}
          totalData={data.totalSuppliers}
          onPageChange={setPage}
        />
      )}
    </>
  )
}

export default SuppliersTable
