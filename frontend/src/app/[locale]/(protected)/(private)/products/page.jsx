import Stats from "./Stats"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProductsTable from "./ProductsTable"
import { useTranslations } from "next-intl"

function ProductsPage() {
  const t = useTranslations("ProductsPage")

  const statsTranslations = {
    totalProducts: t("stats.totalProducts"),
    outOfStock: t("stats.outOfStock"),
  }

  const buttonAddTranslations = t("buttonAdd")

  const productTableTranslations = {
    categoryLabel: t("categoryLabel"),
    selectAll: t("selectAll"),
    placeHolderSearch: t("placeHolderSearch"),
    productsTable: {
      tableHead: {
        sku: t("productsTable.tableHead.sku"),
        name: t("productsTable.tableHead.name"),
        price: t("productsTable.tableHead.price"),
        stock: t("productsTable.tableHead.stock"),
        minStock: t("productsTable.tableHead.minStock"),
        sold: t("productsTable.tableHead.sold"),
        actions: t("productsTable.tableHead.actions"),
      },
      buttonActions: {
        edit: t("productsTable.buttonActions.edit"),
        detail: t("productsTable.buttonActions.detail"),
        delete: t("productsTable.buttonActions.delete"),
      },
    },
  }

  return (
    <div className="space-y-4">
      {/* STATS */}
      <Stats translations={statsTranslations} />
      {/* ADD PRODUCT */}
      <Link href="/products/add" passHref>
        <Button className="mb-2">+ {buttonAddTranslations}</Button>
      </Link>

      {/* TABLE PRODUCTS */}
      <ProductsTable translations={productTableTranslations} />
    </div>
  )
}

export default ProductsPage
