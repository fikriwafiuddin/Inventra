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

const columns = (translations) => {
  return [
    {
      accessorKey: "orderId",
      header: translations.table.orderId,
    },
    {
      accessorKey: "totalRefund",
      header: translations.table.totalRefund,
      cell: ({ row }) => formatCurrency(row.getValue("totalRefund")),
    },
    {
      accessorKey: "date",
      header: translations.table.date,
      cell: ({ row }) => formatDate(row.getValue("date")),
    },
    {
      header: translations.table.actions,
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
                <DialogTitle>{translations.table.viewDetails}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3">
                <p>{translations.table.orderId}</p>
                <p className="col-span-2">: {row.getValue("orderId")}</p>
                <p>{translations.table.totalRefung}</p>
                <p className="col-span-2">
                  : {formatCurrency(row.getValue("totalRefund"))}
                </p>
                <p>{translations.table.date}</p>
                <p className="col-span-2">
                  : {formatDate(row.getValue("date"))}
                </p>
              </div>
              <div className="">
                <p>{translations.table.items}:</p>
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
                  <Button>{translations.table.close}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      },
    },
  ]
}

export default columns
