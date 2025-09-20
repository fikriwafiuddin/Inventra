"use client"

import StatCard from "@/components/StatCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetDashboard } from "@/services/hooks/statistic-hook"
import {
  BanknoteIcon,
  CalendarIcon,
  Inbox,
  TriangleAlertIcon,
} from "lucide-react"

function Stats({ translations }) {
  const { isPending, data } = useGetDashboard()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            title={translations.revenue}
            value={data?.revenue || 0}
            icon={<BanknoteIcon />}
            isCurrency
          />
          <StatCard
            title={translations.products}
            value={data?.totalProducts || 0}
            icon={<Inbox />}
          />
          <StatCard
            title={translations.orders}
            value={data?.totalOrders || 0}
            icon={<CalendarIcon />}
          />
          <StatCard
            title={translations.outOfStock}
            value={data?.outOfStock || 0}
            icon={<TriangleAlertIcon />}
          />
        </>
      )}
    </div>
  )
}

export default Stats
