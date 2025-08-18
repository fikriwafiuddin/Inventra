import { Input } from "@/components/ui/input"
import FilterDate from "./FilterDate"
import { SearchIcon } from "lucide-react"
import PurchasesTable from "./PurchasesTable"

function HistoryTab() {
  return (
    <div className="space-y-4">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* SEARCH */}
        <div className="relative flex-1 h-max">
          <div className="absolute top-0 bottom-0 left-2 flex items-center">
            <SearchIcon className="size-4" />
          </div>
          <Input
            className="pl-8 w-full"
            type="search"
            placeholder="Search purchases by fracture"
          />
        </div>
        <FilterDate />
      </div>
      <PurchasesTable />
    </div>
  )
}

export default HistoryTab
