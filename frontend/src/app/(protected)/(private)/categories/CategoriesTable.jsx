"use client"

import { DataTable } from "@/components/DataTable"
import { Loader2Icon } from "lucide-react"
import columnCategories from "./columnCateogries"
import { useGetAllCategories } from "@/services/hooks/category-hook"

function CategoriesTable() {
  const { isPending, data: categories, isError, error } = useGetAllCategories()

  if (categories) {
    return (
      <>
        <DataTable data={categories} columns={columnCategories} />
        {categories.length > 10 && <AppPagination />}
      </>
    )
  }

  if (isError) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response.data.message}
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }
}

export default CategoriesTable
