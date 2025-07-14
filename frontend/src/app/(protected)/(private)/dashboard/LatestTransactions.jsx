"use client"

import { DataTable } from "@/components/DataTable"
import { formatCurrency } from "@/lib/formatters"

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
]

export const orders = [
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
  {
    id: "TRX-AB12CD34",
    date: "2022-01-01 02:11",
    amount: 100000,
  },
]

function LatestTransactions() {
  return (
    <div className="bg-secondary rounded-lg p-2">
      <h3 className="text-lg font-medium mb-2 text-center">Latest Orders</h3>
      <DataTable columns={columns} data={orders} />
    </div>
  )
}

export default LatestTransactions
