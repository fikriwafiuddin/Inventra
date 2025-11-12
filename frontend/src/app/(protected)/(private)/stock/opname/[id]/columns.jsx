"use client"

import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/formatters"

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "systemStock",
    header: "System Stock",
    cell: ({ row }) => row.getValue("systemStock"),
  },
  {
    accessorKey: "physicalStock",
    header: "Physical Stock",
    cell: ({ row }) => row.getValue("physicalStock"),
  },
  {
    accessorKey: "difference",
    header: "Difference",
    cell: ({ row }) => {
      const difference =
        row.getValue("systemStock") - row.getValue("physicalStock")
      if (difference > 0) {
        return <Badge variant="success">{difference}</Badge>
      }
      return <Badge variant="destructive">{difference}</Badge>
    },
  },
  {
    id: "differenceValue",
    header: "Difference Value",
    cell: ({ row }) => {
      const item = row.original
      const differenceValue =
        (row.getValue("systemStock") - row.getValue("physicalStock")) *
        item.price
      if (differenceValue < 0)
        return (
          <Badge variant="destructive">{formatCurrency(differenceValue)}</Badge>
        )
      return <Badge variant="success">{formatCurrency(differenceValue)}</Badge>
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const difference = row.getValue("difference")
      if (difference === 0) {
        return <Badge variant="success">Match</Badge>
      }
      return <Badge variant="destructive">Difference</Badge>
    },
  },
]

export default columns
