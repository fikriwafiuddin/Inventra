"use client"

import { DataTable } from "@/components/DataTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/formatters"
import { useGetDetailPurchase } from "@/services/hooks/purchase-hook"
import { Loader2Icon } from "lucide-react"
import columns from "./columns"

function DetailPurchase({ invoice }) {
  const { isPending, data: purchase, error } = useGetDetailPurchase(invoice)

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  if (purchase) {
    return (
      <>
        <Card>
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-2xl font-bold">
              Purchase Details
            </CardTitle>
            <CardDescription>
              Complete information regarding this purchase.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Invoice
              </span>
              <span className="text-base font-semibold text-right">
                {purchase.invoice}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Supplier
              </span>
              <span className="text-base font-semibold text-right">
                {purchase.supplier.name}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Date
              </span>
              <span className="text-base font-semibold text-right">
                {formatDate(purchase.date)}
              </span>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold">Items</h3>
        <DataTable columns={columns} data={purchase.items} />
      </>
    )
  }
}

export default DetailPurchase
