"use client"

import { DataTable } from "@/components/DataTable"
import { Loader2Icon } from "lucide-react"
import columnCategories from "./columnCateogries"
import { useGetAllCategories } from "@/services/hooks/category-hook"

function CategoriesTable() {
  const { isPending, data: categories, error } = useGetAllCategories()

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
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

  if (categories) {
    return (
      <>
        <DataTable data={categories} columns={columnCategories} />
        {categories.length > 10 && <AppPagination />}
      </>
    )
  }
}

export default CategoriesTable
