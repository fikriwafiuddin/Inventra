"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/formatters"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

const columns = [
  {
    accessorKey: "name",
    header: "End Date",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Tanggal Mulai",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-4" />
        <span>{formatDate(row.getValue("startDate"))}</span>
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Completion Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-4" />
        <span>
          {row.getValue("endDate") ? formatDate(row.getValue("endDate")) : "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      if (status === "completed") {
        return <Badge variant="success">{status}</Badge>
      }
      return <Badge variant="warning">{status}</Badge>
    },
  },
  {
    accessorKey: "productsCount",
    header: "Products Count",
    cell: ({ row }) => {
      const opname = row.original
      return opname.items ? opname.items.length : 0
    },
  },
  {
    accessorKey: "totalDifference",
    header: "Total Difference",
    cell: ({ row }) => {
      const totalDifference = row.getValue("totalDifference")
      if (totalDifference === null) {
        return "-"
      }
      if (totalDifference < 0) {
        return (
          <span className="text-destructive">
            {totalDifference.toLocaleString()}
          </span>
        )
      }
      return (
        <span className="text-success">{totalDifference.toLocaleString()}</span>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const opname = row.original
      return (
        <Link href={`/stock/opname/${opname._id}`}>
          <Button variant="outline">
            {opname.status === "incomplete" ? "Continue" : "View Details"}
          </Button>
        </Link>
      )
    },
  },
]

export default columns
