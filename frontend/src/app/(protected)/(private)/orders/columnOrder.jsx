"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { EyeIcon, Trash2Icon } from "lucide-react"

const columnOrders = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Order Id",
    cell: ({ row }) => row.getValue("orderId"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.getValue("amount"),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your this data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <EyeIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>View Order Details</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3">
                <p>Order Id</p>
                <p className="col-span-2">: {row.getValue("orderId")}</p>
                <p>Amount</p>
                <p className="col-span-2">
                  : {formatCurrency(row.getValue("amount"))}
                </p>
                <p>Order Date</p>
                <p className="col-span-2">
                  : {formatDate(row.getValue("date"))}
                </p>
              </div>
              <div className="">
                <p>Items:</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.orderId} className="flex justify-between">
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
        </div>
      )
    },
  },
]

export default columnOrders
