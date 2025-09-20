import { Badge } from "@/components/ui/badge"

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="lowercase">{row.getValue("name")}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.category.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock")
      if (stock === 0) {
        return <Badge variant="destructive">{stock.toLocaleString()}</Badge>
      } else {
        return <Badge variant="warning">{stock.toLocaleString()}</Badge>
      }
    },
  },
  {
    accessorKey: "minStock",
    header: "Min Stock",
    cell: ({ row }) => row.getValue("minStock").toLocaleString(),
  },
]

export default columns
