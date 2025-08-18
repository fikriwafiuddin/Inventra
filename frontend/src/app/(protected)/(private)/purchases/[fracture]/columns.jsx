import { formatCurrency } from "@/lib/formatters"

const columns = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product = row.getValue("product")
      return product.name
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => formatCurrency(row.getValue("totalPrice")),
  },
]

export default columns
