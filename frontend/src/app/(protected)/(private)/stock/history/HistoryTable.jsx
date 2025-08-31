import { DataTable } from "@/components/DataTable"
import columns from "./columns"
import { Loader2Icon } from "lucide-react"
import { useGetAllStockMovements } from "@/services/hooks/stockMovement-hook"

function HistoryTable({ start, end, type }) {
  const {
    isPending,
    error,
    data: stockMovements,
  } = useGetAllStockMovements(start, end, type)

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching stock movements."}
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
  return <DataTable data={stockMovements} columns={columns} />
}

export default HistoryTable
