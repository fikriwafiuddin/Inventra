import { DataTable } from "@/components/DataTable"
import { useGetAllAdjustments } from "@/services/hooks/adjustment-hook"
import { Loader2Icon } from "lucide-react"
import columns from "./columns"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

function History() {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const [start, setStart] = useState(firstDay)
  const [end, setEnd] = useState(lastDay)
  const { isPending, data, error } = useGetAllAdjustments(start, end)

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching adjustments stock."}
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 mb-4">
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
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default History
