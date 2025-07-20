"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

function FilterDate() {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)
  return (
    <div className="flex gap-1">
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
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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
  )
}

export default FilterDate
