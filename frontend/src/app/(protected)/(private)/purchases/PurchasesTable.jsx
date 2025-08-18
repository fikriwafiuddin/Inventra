"use client"

import { DataTable } from "@/components/DataTable"
import { useGetAllPurchases } from "@/services/hooks/purchase-hook"
import React from "react"
import columnPurchases from "./columnPurchases"
import { Loader2Icon } from "lucide-react"

function PurchasesTable() {
  const { isPending, data: purchases, error } = useGetAllPurchases()

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
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

  if (purchases) {
    return <DataTable data={purchases} columns={columnPurchases} />
  }
}

export default PurchasesTable
