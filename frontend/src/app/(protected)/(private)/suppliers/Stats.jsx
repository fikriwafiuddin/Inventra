import StatCard from "@/components/StatCard"
import { RefreshCwIcon, RefreshCwOffIcon, TruckIcon } from "lucide-react"

function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Suppliers" value={10} icon={<TruckIcon />} />
      <StatCard title="Active Suppliers" value={8} icon={<RefreshCwIcon />} />
      <StatCard
        title="Inactive Suppliers"
        value={2}
        icon={<RefreshCwOffIcon />}
      />
    </div>
  )
}

export default Stats
