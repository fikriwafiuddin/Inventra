"use client"

import StatCard from "@/components/StatCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetStatisticSupplier } from "@/services/hooks/statistic-hook"
import { RefreshCwIcon, RefreshCwOffIcon, TruckIcon } from "lucide-react"
import { toast } from "sonner"

function Stats({ translations }) {
  const { isPending, data: statistic, isError } = useGetStatisticSupplier()

  if (isError) {
    toast.error("Product statistics failed to retrieve")
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isPending || isError ? (
        <>
          <>
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
          </>
        </>
      ) : (
        <>
          <StatCard
            title={translations.totalSuppliers}
            value={statistic?.totalSupplier || 0}
            icon={<TruckIcon />}
          />
          <StatCard
            title={translations.activeSuppliers}
            value={statistic?.totalActive || 0}
            icon={<RefreshCwIcon />}
          />
          <StatCard
            title={translations.inactiveSuppliers}
            value={statistic?.totalInactive || 0}
            icon={<RefreshCwOffIcon />}
          />
        </>
      )}
    </div>
  )
}

export default Stats
