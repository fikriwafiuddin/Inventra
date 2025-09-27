import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/formatters"

const columns = (translations) => [
  {
    accessorKey: "timestamp",
    header: translations.table.date,
    cell: ({ row }) => formatDate(row.getValue("timestamp")),
  },
  {
    header: translations.table.product,
    cell: ({ row }) => {
      const product = row.original.product
      return (
        <div className="flex flex-col">
          <span className="lowercase">{product.name}</span>
          <span className="text-sm text-muted-foreground">{product.sku}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "movementType",
    header: translations.table.movementType,
    cell: ({ row }) => {
      const movementType = row.getValue("movementType")
      switch (movementType) {
        case "sales":
          return <Badge variant="destructive">{translations.table.sales}</Badge>
        case "adjustment":
          return (
            <Badge variant="warning">{translations.table.adjustment}</Badge>
          )
        case "purchase":
          return <Badge variant="success">{translations.table.purchase}</Badge>
        case "opname":
          return <Badge variant="secondary">{translations.table.opname}</Badge>
        case "customerReturn":
          return (
            <Badge variant="destructive">
              {translations.table.customerReturn}
            </Badge>
          )
        case "supplierReturn":
          return (
            <Badge variant="destructive">
              {translations.table.supplierReturn}
            </Badge>
          )
      }
    },
  },
  {
    header: translations.table.change,
    cell: ({ row }) => {
      const change = row.getValue("finalStock") - row.getValue("initialStock")
      if (change < 0) {
        return <Badge variant="destructive">{change}</Badge>
      } else {
        return <Badge variant="success">{change}</Badge>
      }
    },
  },
  {
    accessorKey: "initialStock",
    header: translations.table.initialStock,
  },
  {
    accessorKey: "finalStock",
    header: translations.table.finalStock,
  },
  {
    accessorKey: "reason",
    header: translations.table.reason,
    cell: ({ row }) => row.getValue("reason"),
  },
]

export default columns
