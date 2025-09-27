import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/formatters"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

const columns = (translations) => [
  {
    accessorKey: "name",
    header: translations.name,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: translations.startDate,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-4" />
        <span>{formatDate(row.getValue("startDate"))}</span>
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: translations.endDate,
    cell: ({ row }) =>
      row.getValue("endDate") ? (
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <span>{formatDate(row.getValue("endDate"))}</span>
        </div>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "status",
    header: translations.status,
    cell: ({ row }) => {
      const status = row.getValue("status")
      if (status === "completed") {
        return <Badge variant="success">{translations.completed}</Badge>
      }
      return <Badge variant="warning">{translations.incomplete}</Badge>
    },
  },
  {
    accessorKey: "productsCount",
    header: translations.productsCount,
    cell: ({ row }) => {
      const opname = row.original
      return opname.items ? opname.items.length : 0
    },
  },
  {
    accessorKey: "totalDifference",
    header: translations.totalDifference,
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
    header: translations.actions,
    cell: ({ row }) => {
      const opname = row.original
      return (
        <Link href={`/stock/opname/${opname._id}`}>
          <Button variant="outline">
            {opname.status === "incomplete"
              ? translations.continue
              : translations.viewDetails}
          </Button>
        </Link>
      )
    },
  },
]

export default columns
