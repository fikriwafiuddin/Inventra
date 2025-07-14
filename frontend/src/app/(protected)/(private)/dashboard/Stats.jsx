import StatCard from "@/components/StatCard"
import {
  BanknoteIcon,
  CalendarIcon,
  Inbox,
  TriangleAlertIcon,
} from "lucide-react"

function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Revenue"
        value={1000000}
        icon={<BanknoteIcon className="size-4" />}
        isCurrency
        change={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="Products"
        value={100}
        icon={<Inbox className="size-4" />}
      />
      <StatCard
        title="Orders"
        value={1000}
        icon={<CalendarIcon className="size-4" />}
        change={{ value: 10, isPositive: true }}
      />
      <StatCard
        title="Out of stock"
        value={10}
        icon={<TriangleAlertIcon className="size-4" />}
      />
    </div>
  )
}

export default Stats
