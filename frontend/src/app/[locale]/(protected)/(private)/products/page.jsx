"use client"

import { Input } from "@/components/ui/input"
import Stats from "./Stats"
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
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProductsTable from "./ProductsTable"
import { useState } from "react"
import { useGetAllCategories } from "@/services/hooks/category-hook"

function ProductsPage() {
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const { isPending, data: categories, error } = useGetAllCategories()

  return (
    <div className="space-y-4">
      {/* STATS */}
      <Stats />

      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Link href="/products/add" passHref>
          <Button className="mb-2">+ Add Product</Button>
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
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {error && (
                  <span className="text-center text-sm text-destructive">
                    {error}
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
      </div>

      {/* TABLE PRODUCTS */}
      <ProductsTable category={category} search={search} />
    </div>
  )
}

export default ProductsPage
