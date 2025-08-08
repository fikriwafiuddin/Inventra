"use client"

import { useGetAllSuppliers } from "@/services/hooks/supplier-hook"
import { Loader2Icon } from "lucide-react"
import columnSuppliers from "./columnsSuppliers"
import { DataTable } from "@/components/DataTable"

function SuppliersTable() {
  const { isError, isPending, data: suppliers } = useGetAllSuppliers()
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

  return <DataTable data={suppliers} columns={columnSuppliers} />
}

export default SuppliersTable
