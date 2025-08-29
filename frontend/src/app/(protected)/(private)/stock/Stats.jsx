import StatCard from "@/components/StatCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetStockSummary } from "@/services/hooks/statistic-hook"
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  PackageIcon,
  RefreshCwIcon,
} from "lucide-react"

function Stats() {
  const { isPending, data } = useGetStockSummary()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {isPending ? (
        <>
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
        </>
      ) : (
        <>
          <StatCard
            title="Total Products"
            value={data?.totalProducts?.toLocaleString() || 0}
            icon={<PackageIcon />}
          />
          <StatCard
            title="Stock Habis"
            value={data?.outOfStock?.toLocaleString() || 0}
            icon={<AlertCircleIcon className="text-destructive" />}
          />
          <StatCard
            title="Stock Rendah"
            value={data?.lowStock?.toLocaleString() || 0}
            icon={<AlertTriangleIcon className="text-warning" />}
          />
          <StatCard
            title="Pergerakan Hari Ini"
            value={data?.todayStockMovementCount?.toLocaleString() || 0}
            icon={<RefreshCwIcon className="text-info" />}
          />
        </>
      )}
    </div>
  )
}

export default Stats
