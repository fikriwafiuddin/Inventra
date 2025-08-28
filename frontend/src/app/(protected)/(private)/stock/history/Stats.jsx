import StatCard from "@/components/StatCard"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PackageIcon,
  TrendingUpIcon,
} from "lucide-react"

function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total Transactions" value={10} icon={<PackageIcon />} />
      <StatCard
        title="Stock In"
        value={10}
        icon={<ArrowUpIcon className="text-success" />}
      />
      <StatCard
        title="Stock Out"
        value={100}
        icon={<ArrowDownIcon className="text-destructive" />}
      />
      <StatCard title="Net Change" value={100} icon={<TrendingUpIcon />} />
    </div>
  )
}

export default Stats
