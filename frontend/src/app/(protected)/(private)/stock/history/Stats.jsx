import StatCard from "@/components/StatCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetstockMovementSummary } from "@/services/hooks/statistic-hook"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PackageIcon,
  TrendingUpIcon,
} from "lucide-react"

function Stats() {
  const { isPending, data: statistic } = useGetstockMovementSummary()

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
            title="Total Transactions"
            value={statistic?.totalTransactions || 0}
            icon={<PackageIcon />}
          />
          <StatCard
            title="Stock In"
            value={statistic?.stockIn || 0}
            icon={<ArrowUpIcon className="text-success" />}
          />
          <StatCard
            title="Stock Out"
            value={statistic?.stockOut || 0}
            icon={<ArrowDownIcon className="text-destructive" />}
          />
          <StatCard
            title="Net Change"
            value={(statistic?.stockIn || 0) - (statistic?.stockOut || 0)}
            icon={<TrendingUpIcon />}
          />
        </>
      )}
    </div>
  )
}

export default Stats
