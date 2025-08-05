import AppPagination from "@/components/AppPagination"
import { DataTable } from "@/components/DataTable"
import { useGetAllProducts } from "@/services/hooks/product-hook"
import { Loader2Icon } from "lucide-react"
import columnProducts from "./columnProducts"

function ProductsTable() {
  const { isPending, data: products, error } = useGetAllProducts()

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

  if (products) {
    return (
      <>
        <DataTable columns={columnProducts} data={products} />
        <AppPagination />
      </>
    )
  }
}

export default ProductsTable
