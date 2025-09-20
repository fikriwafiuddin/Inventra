import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { EyeIcon } from "lucide-react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const columns = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "totalRefund",
    header: "Total Refund",
    cell: ({ row }) => formatCurrency(row.getValue("totalRefund")),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const items = row.original.items
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <EyeIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>View Refund Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3">
              <p>Order Id</p>
              <p className="col-span-2">: {row.getValue("orderId")}</p>
              <p>Total Refund</p>
              <p className="col-span-2">
                : {formatCurrency(row.getValue("totalRefund"))}
              </p>
              <p>Date</p>
              <p className="col-span-2">: {formatDate(row.getValue("date"))}</p>
            </div>
            <div className="">
              <p>Items:</p>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} {item.quantity}x
                    </span>
                    <span>{formatCurrency(item.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]

export default columns
