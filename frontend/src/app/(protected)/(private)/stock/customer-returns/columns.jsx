import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/formatters"
import { EyeIcon } from "lucide-react"

const columns = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "totalRefund",
    header: "Total Refund",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Button>
        <EyeIcon />
      </Button>
    ),
  },
]

export default columns
