"use client"

import { Input } from "@/components/ui/input"
import Stats from "./Stats"
import { SearchIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable"
import AppPagination from "@/components/AppPagination"
import columnProducts from "./columnProducts"
import products from "@/data/products-data"
import categories from "@/data/categories-data"
import Link from "next/link"

function ProductsPage() {
  return (
    <div className="space-y-4">
      {/* STATS */}
      <Stats />

      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Link className="block" href="/products/add" passHref>
          <Button>+ Add Product</Button>
        </Link>

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
              placeholder="Search products"
            />
          </div>
          {/* SELECT BY CATEGORY */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TABLE PRODUCTS */}
      <DataTable columns={columnProducts} data={products} />
      <AppPagination />
    </div>
  )
}

export default ProductsPage
