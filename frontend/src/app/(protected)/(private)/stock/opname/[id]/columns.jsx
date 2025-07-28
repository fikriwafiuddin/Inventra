"use client"

import { Badge } from "@/components/ui/badge"

const { formatCurrency } = require("@/lib/formatters")

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
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
      const difference = row.getValue("difference")
      if (difference > 0) {
        return <Badge variant="success">{difference}</Badge>
      }
      return <Badge variant="destructive">{difference}</Badge>
    },
  },
  {
    id: "value",
    header: "Value",
    // cell: ({row}) => formatCurrency(row.difference * row.price)
  },
  {
    id: "status",
    header: "Status",
  },
]

export default columns
