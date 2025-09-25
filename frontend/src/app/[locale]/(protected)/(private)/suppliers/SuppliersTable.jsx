"use client"

import { useGetAllSuppliers } from "@/services/hooks/supplier-hook"
import { Loader2Icon, SearchIcon } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import { useEffect, useState } from "react"
import AppPagination from "@/components/AppPagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import createColumnSuppliers from "./columnsSuppliers"

function SuppliersTable({ translations }) {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState("all")
  const [search, setSearch] = useState("")
  const { isError, isPending, data } = useGetAllSuppliers(page, status, search)

  const columnSuppliers = createColumnSuppliers(translations)

  useEffect(() => {
    setPage(1)
  }, [status, search])

  return (
    <>
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
            placeholder={translations.placeholderSearch}
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
              <SelectLabel>{translations.statusLabel}</SelectLabel>
              <SelectItem value="all">{translations.allStatus}</SelectItem>
              <SelectItem value="active">
                {translations.status.active}
              </SelectItem>
              <SelectItem value="inactive">
                {translations.status.inactive}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {isError && <div className="text-destructive text-center mt-4"></div>}

      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {data && (
        <>
          <DataTable data={data.suppliers} columns={columnSuppliers} />
          {data.totalPages > 1 && (
            <AppPagination
              currentPage={page}
              totalPage={data.totalPages}
              pageSize={10}
              totalData={data.totalSuppliers}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  )
}

export default SuppliersTable
