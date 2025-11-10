import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import FormCategory from "./FormCategory"
import CategoriesTable from "./CategoriesTable"

function categoriesPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <FormCategory>
          <Button>+ Add Category</Button>
        </FormCategory>

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
