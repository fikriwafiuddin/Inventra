"use client"

import React from "react"
import Stats from "./Stats"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SalesChart from "./SalesChart"

function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih Periode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
          <SelectItem value="3-bulan-terakhir">3 Bulan Terakhir</SelectItem>
          <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
        </SelectContent>
      </Select>

      <Stats />

      <SalesChart />
    </div>
  )
}

export default AnalyticsPage
