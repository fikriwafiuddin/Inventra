"use client"

import { DataTable } from "@/components/DataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { useGetLatestOrders } from "@/services/hooks/statistic-hook"

export const columns = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
]

function LatestTransactions() {
  const { isPending, data: orders } = useGetLatestOrders()
  return (
    <div className="bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">Latest Orders</h3>
      {isPending ? (
        <Skeleton className="h-[250px]" />
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </div>
  )
}

export default LatestTransactions
