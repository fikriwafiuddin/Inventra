import AppPagination from "@/components/AppPagination"
import { DataTable } from "@/components/DataTable"
import { useGetAllProducts } from "@/services/hooks/product-hook"
import { Loader2Icon } from "lucide-react"
import columnProducts from "./columnProducts"
import { useEffect, useState } from "react"

function ProductsTable({ category, search }) {
  const [page, setPage] = useState(1)
  const { isPending, data, error } = useGetAllProducts(page, category, search)

  useEffect(() => {
    setPage(1)
  }, [category, search])

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

  if (data) {
    return (
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
    )
  }
}

export default ProductsTable
