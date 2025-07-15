import StatCard from "@/components/StatCard"
import { InboxIcon, TriangleAlertIcon } from "lucide-react"

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Total Products"
        value={100}
        icon={<InboxIcon className="size-4" />}
      />
      <StatCard
        title="Out of Stock"
        value={50}
        icon={<TriangleAlertIcon className="size-4" />}
      />
    </div>
  )
}

export default Stats
