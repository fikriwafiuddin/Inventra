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

const columns = (translations) => [
  {
    accessorKey: "invoice",
    header: translations.table.invoice,
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
      const totalRefund = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
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
              <p>{translations.table.invoice}</p>
              <p className="col-span-2">: {row.getValue("invoice")}</p>
              <p>{translations.table.totalRefund}</p>
              <p className="col-span-2">: {formatCurrency(totalRefund)}</p>
              <p>{translations.table.date}</p>
              <p className="col-span-2">: {formatDate(row.getValue("date"))}</p>
              <p>Notes</p>
              <p className="col-span-2">: {row.original.notes}</p>
            </div>
            <div>
              <p>{translations.table.items}:</p>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="flex justify-between">
                      <span>
                        {item.name} {item.quantity}x
                      </span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Condition: {item.condition}
                    </span>
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

export default columns
