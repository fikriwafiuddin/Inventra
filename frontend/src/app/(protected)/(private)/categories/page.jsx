import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { SearchIcon, Table } from "lucide-react"
import columnCategories from "./columnCateogries"
import FormCategory from "./FormCategory"
import AppPagination from "@/components/AppPagination"
import { useGetAllCategories } from "@/services/hooks/category-hook"
import CategoriesTable from "./CategoriesTable"

// const categories = [
//   {
//     name: "Motherboard",
//     _id: "111",
//     createdAt: "2022-01-01",
//     updatedAt: "2022-01-01",
//   },
//   {
//     name: "CPU",
//     _id: "222",
//     createdAt: "2022-01-01",
//     updatedAt: "2022-01-01",
//   },
//   {
//     name: "GPU",
//     _id: "333",
//     createdAt: "2022-01-01",
//     updatedAt: "2022-01-01",
//   },
//   {
//     name: "RAM",
//     _id: "444",
//     createdAt: "2022-01-01",
//     updatedAt: "2022-01-01",
//   },
//   {
//     name: "PSU",
//     _id: "555",
//     createdAt: "2022-01-01",
//     updatedAt: "2022-01-01",
//   },
// ]

function categoriesPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>+ Add Category</Button>
          </SheetTrigger>
          <FormCategory />
        </Sheet>

        {/* FILTER */}
        <div className="">
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
        </div>
      </div>

      <CategoriesTable />
    </div>
  )
}

export default categoriesPage
