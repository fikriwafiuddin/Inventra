import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/formatters"

const columns = [
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("timestamp")),
  },
  {
    header: "Product",
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
    header: "Movement Type",
    cell: ({ row }) => {
      const movementType = row.getValue("movementType")
      switch (movementType) {
        case "sales":
          return <Badge variant="destructive">Sales</Badge>
        case "adjustment":
          return <Badge variant="warning">Adjustment</Badge>
        case "purchase":
          return <Badge variant="success">Purchase</Badge>
        case "opname":
          return <Badge variant="secondary">Opname</Badge>
        case "customerReturn":
          return <Badge variant="destructive">Customer Return</Badge>
        case "supplierReturn":
          return <Badge variant="destructive">Supplier Return</Badge>
      }
    },
  },
  {
    header: "Change",
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
    header: "Initial Stock",
  },
  {
    accessorKey: "finalStock",
    header: "Final Stock",
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => row.getValue("reason"),
  },
]

export default columns
