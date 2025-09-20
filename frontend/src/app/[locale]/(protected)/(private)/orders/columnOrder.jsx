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
import ReceiptModal from "./ReceiptModal"

const columnOrders = [
  {
    accessorKey: "orderId",
    header: "Order Id",
    cell: ({ row }) => row.getValue("orderId"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
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
          <ReceiptModal orderData={order} />
        </div>
      )
    },
  },
]

export default columnOrders
