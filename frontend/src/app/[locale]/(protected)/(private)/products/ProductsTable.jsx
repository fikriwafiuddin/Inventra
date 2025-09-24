"use client"

import AppPagination from "@/components/AppPagination"
import { DataTable } from "@/components/DataTable"
import { useGetAllProducts } from "@/services/hooks/product-hook"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Loader2Icon, SearchIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetAllCategories } from "@/services/hooks/category-hook"
import createColumnProducts from "./columnProducts"

function ProductsTable({ translations }) {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const {
    isPending,
    data: categories,
    error: errorCategories,
  } = useGetAllCategories()
  const {
    fetchingProducts,
    data,
    error: errorProducts,
  } = useGetAllProducts(page, category, search)

  const columnProducts = createColumnProducts(translations.productsTable)

  useEffect(() => {
    setPage(1)
  }, [category, search])

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
            placeholder={translations.placeHolderSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* SELECT BY CATEGORY */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{translations.categoryLabel}</SelectLabel>
              <SelectItem value="all">{translations.selectAll}</SelectItem>
              {errorCategories && (
                <span className="text-center text-sm text-destructive">
                  {errorCategories}
                </span>
              )}
              {isPending && (
                <Loader2Icon className="animate-spin mx-auto my-4" />
              )}
              {categories &&
                categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {errorProducts && (
        <div className="text-destructive text-center mt-4">
          {errorProducts.response?.data.message ||
            errorProducts.message ||
            "An error occurred while fetching categories."}
        </div>
      )}

      {fetchingProducts && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {data && (
        <>
          <DataTable columns={columnProducts} data={data.products} />
          <AppPagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            pageSize={data.limit}
            onPageChange={setPage}
            totalData={data.totalProducts}
          />
        </>
      )}
    </>
  )
}

export default ProductsTable
