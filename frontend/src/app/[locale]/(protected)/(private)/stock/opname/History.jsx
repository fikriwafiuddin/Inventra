"use client"

import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon, Loader2Icon, PackageIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import columns from "./columns"
import { DataTable } from "@/components/DataTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllOpnames } from "@/services/hooks/opname-hook"
import { Button } from "@/components/ui/button"

function History({ translations, tableTranslations }) {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [start, setStart] = useState(firstDay)
  const [end, setEnd] = useState(lastDay)
  const [status, setStatus] = useState("all")
  const {
    isPending: fetching,
    data: opnames,
    error,
  } = useGetAllOpnames(start, end, status)

  if (fetching) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message || error.message || translations.error}
      </div>
    )
  }

  return (
    <>
      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
        <div className="flex flex-col sm:flex-row gap-1 mb-4">
          <div className="flex">
            <Label htmlFor="start" className="px-1">
              {translations.from}
            </Label>
            <Popover open={openStart} onOpenChange={setOpenStart}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="start"
                  className="w-48 justify-between font-normal"
                >
                  {start ? start.toLocaleDateString() : translations.selectDate}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={start}
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
              {translations.to}
            </Label>
            <Popover open={openEnd} onOpenChange={setOpenEnd}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="end"
                  className="w-48 justify-between font-normal"
                >
                  {end ? end.toLocaleDateString() : translations.selectDate}
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

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={translations.selectStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{translations.categories}</SelectLabel>
              <SelectItem value="all">{translations.all}</SelectItem>
              <SelectItem value="completed">
                {translations.completed}
              </SelectItem>
              <SelectItem value="incomplete">
                {translations.incomplete}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageIcon className="w-5 h-5" />
            {translations.listTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {opnames && (
            <DataTable columns={columns(tableTranslations)} data={opnames} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default History
