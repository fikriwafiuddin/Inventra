import { Badge } from "@/components/ui/badge"

const columns = [
  {
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product
      return product.name
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity")
      if (quantity < 0) {
        return <Badge variant="destructive">{quantity.toLocaleString()}</Badge>
      } else {
        return <Badge variant="success">{quantity.toLocaleString()}</Badge>
      }
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <Badge>{row.getValue("reason")}</Badge>,
  },
]

export default columns
