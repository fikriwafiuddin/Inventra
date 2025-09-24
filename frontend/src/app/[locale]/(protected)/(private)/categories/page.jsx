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
import { useTranslations } from "next-intl"

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
  const t = useTranslations("CategoriesPage")
  const translations = {
    buttonAdd: t("buttonAdd"),
    formCategory: {
      titleAdd: t("formCategory.titleAdd"),
      titleEdit: t("formCategory.titleEdit"),
      labelName: t("formCategory.labelName"),
      placeholderName: t("formCategory.placeholderName"),
      buttonSave: t("formCategory.buttonSave"),
      buttonCancel: t("formCategory.buttonCancel"),
    },
    categoriesTable: {
      tableHead: {
        name: t("categoriesTable.tableHead.name"),
        createdAt: t("categoriesTable.tableHead.createdAt"),
        updatedAt: t("categoriesTable.tableHead.updatedAt"),
        actions: t("categoriesTable.tableHead.actions"),
      },
      buttonActions: {
        edit: t("categoriesTable.buttonActions.edit"),
        delete: t("categoriesTable.buttonActions.delete"),
      },
      confirmDelete: {
        title: t("categoriesTable.confirmDelete.title"),
        description: t("categoriesTable.confirmDelete.description"),
        cancelButton: t("categoriesTable.confirmDelete.cancelButton"),
      },
      formCategory: {
        titleAdd: t("formCategory.titleAdd"),
        titleEdit: t("formCategory.titleEdit"),
        labelName: t("formCategory.labelName"),
        placeholderName: t("formCategory.placeholderName"),
        buttonSave: t("formCategory.buttonSave"),
        buttonCancel: t("formCategory.buttonCancel"),
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>+ {translations.buttonAdd}</Button>
          </SheetTrigger>
          <FormCategory translations={translations.formCategory} />
        </Sheet>

        {/* FILTER */}
        <div className="">
          {/* SEARCH */}
          {/* <div className="relative flex-1 h-max">
            <div className="absolute top-0 bottom-0 left-2 flex items-center">
              <SearchIcon className="size-4" />
            </div>
            <Input
              className="pl-8 w-full"
              type="search"
              placeholder="Search products"
            />
          </div> */}
        </div>
      </div>

      <CategoriesTable translations={translations} />
    </div>
  )
}

export default categoriesPage
