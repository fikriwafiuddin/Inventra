import { DataTable } from "@/components/DataTable"
import { Loader2Icon } from "lucide-react"
import { useGetAllStockMovements } from "@/services/hooks/stockMovement-hook"
import columns from "./columns"

function HistoryTable({ start, end, type, translations }) {
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
          translations.errors.fetching}
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
  return <DataTable data={stockMovements} columns={columns(translations)} />
}

export default HistoryTable
