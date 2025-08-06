import StatCard from "@/components/StatCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetStatisticProduct } from "@/services/hooks/statistic-hook"
import { InboxIcon, TriangleAlertIcon } from "lucide-react"
import { toast } from "sonner"

function Stats() {
  const { isPending, data: statistic, isError } = useGetStatisticProduct()

  if (isError) {
    toast.error("Product statistics failed to retrieve")
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {isPending ? (
        <>
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
        </>
      ) : (
        <>
          <StatCard
            title="Total Products"
            value={statistic?.totalProduct || 0}
            icon={<InboxIcon />}
          />
          <StatCard
            title="Out of Stock"
            value={statistic?.outOfStock || 0}
            icon={<TriangleAlertIcon className="text-warning" />}
          />
        </>
      )}
    </div>
  )
}

export default Stats
