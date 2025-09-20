"use client"

import { DataTable } from "@/components/DataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { useGetLatestOrders } from "@/services/hooks/statistic-hook"

const createColumns = (translations) => {
  return [
    {
      accessorKey: "orderId",
      header: translations.orderId,
    },
    {
      accessorKey: "date",
      header: translations.date,
      cell: ({ row }) => formatDate(row.getValue("date")),
    },
    {
      accessorKey: "amount",
      header: translations.amount,
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
  ]
}

function LatestTransactions({ translations }) {
  const { isPending, data: orders } = useGetLatestOrders()
  const columns = createColumns(translations.tableHead)

  return (
    <div className="bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">
        {translations.title}
      </h3>
      {isPending ? (
        <Skeleton className="h-[250px]" />
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </div>
  )
}

export default LatestTransactions
