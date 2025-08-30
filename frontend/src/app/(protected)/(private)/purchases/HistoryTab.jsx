import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import PurchasesTable from "./PurchasesTable"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"

function HistoryTab() {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    setStart(firstDay)
    setEnd(lastDay)
  }, [])

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-1">
          <div className="flex">
            <Label htmlFor="start" className="px-1">
              From
            </Label>
            <Popover open={openStart} onOpenChange={setOpenStart}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="start"
                  className="w-48 justify-between font-normal"
                >
                  {start ? start.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={end}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStart(date)
                    setOpenStart(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex">
            <Label htmlFor="end" className="px-1">
              To
            </Label>
            <Popover open={openEnd} onOpenChange={setOpenEnd}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="end"
                  className="w-48 justify-between font-normal"
                >
                  {end ? end.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={end}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEnd(date)
                    setOpenEnd(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {start && end && (
        <PurchasesTable start={start} end={end} search={search} />
      )}
    </div>
  )
}

export default HistoryTab
