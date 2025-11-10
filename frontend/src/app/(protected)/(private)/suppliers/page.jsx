"use client"

import { useState } from "react"
import Stats from "./Stats"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import FormSupplier from "./FormSupplier"
import SuppliersTable from "./SuppliersTable"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SuppliersPage() {
  const [status, setStatus] = useState("all")
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-4">
      <Stats />

      <div className="space-y-2">
        {/* ADD SUPPLIER */}
        <FormSupplier>
          <Button>+ Add Supplier</Button>
        </FormSupplier>

        {/* FILTER */}
        <div className="flex gap-2">
          {/* SEARCH */}
          <div className="relative flex-1 h-max">
            <div className="absolute top-0 bottom-0 left-2 flex items-center">
              <SearchIcon className="size-4" />
            </div>
            <Input
              className="pl-8 w-full"
              type="search"
              placeholder="Search supplier"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* SELECT BY STATUS */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SuppliersTable status={status} search={search} />
    </div>
  )
}

export default SuppliersPage
