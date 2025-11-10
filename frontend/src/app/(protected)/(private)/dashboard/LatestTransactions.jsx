"use client"

import { DataTable } from "@/components/DataTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="gap-2 p-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Latest Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {isPending ? (
          <Skeleton className="h-[250px]" />
        ) : (
          <DataTable columns={columns} data={orders} />
        )}
      </CardContent>
    </Card>
  )
}

export default LatestTransactions
