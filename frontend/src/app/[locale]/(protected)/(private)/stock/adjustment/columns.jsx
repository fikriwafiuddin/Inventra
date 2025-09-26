import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/formatters"

const createColumns = (translations) => {
  return [
    {
      header: translations.tableHead.product,
      cell: ({ row }) => {
        const product = row.original.product
        return product.name
      },
    },
    {
      accessorKey: "quantity",
      header: translations.tableHead.quantity,
      cell: ({ row }) => {
        const quantity = row.getValue("quantity")
        if (quantity < 0) {
          return (
            <Badge variant="destructive">{quantity.toLocaleString()}</Badge>
          )
        } else {
          return <Badge variant="success">{quantity.toLocaleString()}</Badge>
        }
      },
    },
    {
      header: translations.tableHead.date,
      cell: ({ row }) => {
        const date = row.original.createdAt
        return formatDate(date)
      },
    },
    {
      accessorKey: "reason",
      header: translations.tableHead.reason,
      cell: ({ row }) => (
        <Badge>{translations.reason[row.getValue("reason")]}</Badge>
      ),
    },
  ]
}

export default createColumns
