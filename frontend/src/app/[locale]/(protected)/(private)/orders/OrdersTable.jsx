import { Loader2Icon } from "lucide-react"
import React from "react"
import columnOrders from "./columnOrder"
import { useGetAllOrders } from "@/services/hooks/order-hook"
import { DataTable } from "@/components/DataTable"

function OrdersTable({ start, end, search }) {
  const { isPending, data: orders, error } = useGetAllOrders(start, end, search)

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
      </div>
    )
  }
  return <DataTable data={orders} columns={columnOrders} />
}

export default OrdersTable
