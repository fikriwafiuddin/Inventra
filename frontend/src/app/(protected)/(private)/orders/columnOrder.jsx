"use client"

import ReceiptModal from "@/components/ReceiptModal"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { EyeIcon } from "lucide-react"
import { useState } from "react"

const columnOrders = (user) => [
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
      const [showReceiptModal, setShowReceiptModal] = useState(false)
      return (
        <>
          <div className="space-x-2">
            <Button onClick={() => setShowReceiptModal(true)}>
              <EyeIcon />
            </Button>
          </div>
          <ReceiptModal
            isOpen={showReceiptModal}
            onClose={() => setShowReceiptModal(false)}
            orderData={order}
            user={user}
          />
        </>
      )
    },
  },
]

export default columnOrders
