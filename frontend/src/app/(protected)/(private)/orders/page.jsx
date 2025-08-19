"use client"

import { Input } from "@/components/ui/input"
import { Loader2Icon, SearchIcon } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import columnOrders from "./columnOrder"
import AppPagination from "@/components/AppPagination"
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
import { useGetAllOrders } from "@/services/hooks/order-hook"

function OrdersPage() {
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const [start, setStart] = useState(firstDay)
  const [end, setEnd] = useState(lastDay)
  const { isPending, data: orders, error } = useGetAllOrders()

  return (
    <div className="space-y-4">
      {/* FILTER */}
      <div className="flex gap-4">
        {/* SEARCH */}
        <div className="relative flex-1 h-max">
          <div className="absolute top-0 bottom-0 left-2 flex items-center">
            <SearchIcon className="size-4" />
          </div>
          <Input
            className="pl-8 w-full"
            type="search"
            placeholder="Search order by id"
          />
        </div>
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

      {error && (
        <div className="text-destructive text-center mt-4">
          {error.response?.data.message ||
            error.message ||
            "An error occurred while fetching categories."}
        </div>
      )}
      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {orders && (
        <>
          <DataTable data={orders} columns={columnOrders} />
          {orders?.length > 10 && <AppPagination />}
        </>
      )}
    </div>
  )
}

export default OrdersPage
