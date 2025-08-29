import { DataTable } from "@/components/DataTable"
import { useGetAllAdjustments } from "@/services/hooks/adjustment-hook"
import { Loader2Icon } from "lucide-react"
import columns from "./columns"

function History() {
  const { isPending, data, error } = useGetAllAdjustments()

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching adjustments stock."}
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

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default History
