"use client"

import Stats from "./Stats"
import HistoryTable from "./HistoryTable"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function History({ translations }) {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [type, setType] = useState("all")

  useEffect(() => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    setStart(firstDay)
    setEnd(lastDay)
  }, [])

  return (
    <>
      <Stats translations={translations} />

      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
        <div className="flex flex-col sm:flex-row gap-1 mb-4">
          <div className="flex">
            <Label htmlFor="start" className="px-1">
              {translations.filters.from}
            </Label>
            <Popover open={openStart} onOpenChange={setOpenStart}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="start"
                  className="w-48 justify-between font-normal"
                >
                  {start
                    ? start.toLocaleDateString()
                    : translations.filters.selectDate}
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
              {translations.filters.to}
            </Label>
            <Popover open={openEnd} onOpenChange={setOpenEnd}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="end"
                  className="w-48 justify-between font-normal"
                >
                  {end
                    ? end.toLocaleDateString()
                    : translations.filters.selectDate}
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
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={translations.filters.selectDate} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{translations.filters.categories}</SelectLabel>
              <SelectItem value="all">{translations.filters.all}</SelectItem>
              <SelectItem value="adjustment">
                {translations.filters.adjustment}
              </SelectItem>
              <SelectItem value="customerReturn">
                {translations.filters.customerReturn}
              </SelectItem>
              <SelectItem value="supplierReturn">
                {translations.filters.supplierReturn}
              </SelectItem>
              <SelectItem value="opname">
                {translations.filters.opname}
              </SelectItem>
              <SelectItem value="sales">
                {translations.filters.sales}
              </SelectItem>
              <SelectItem value="purchase">
                {translations.filters.purchase}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {start && end && (
        <HistoryTable
          start={start}
          end={end}
          type={type}
          translations={translations}
        />
      )}
    </>
  )
}

export default History
