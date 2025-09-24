import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import FormUpdate from "./FormUpdate"
import { getTranslations } from "next-intl/server"

async function UpdatePage({ params }) {
  const { sku } = await params

  const t = await getTranslations("UpdateProductPage")
  const updateProductPageTranslations = {
    breadcrumb: {
      products: t("breadcrumb.products"),
      edit: t("breadcrumb.edit"),
    },
  }

  const tForm = await getTranslations("FormProduct")
  const formTranslations = {
    labelName: tForm("labelName"),
    placeholderName: tForm("placeholderName"),
    labelPrice: tForm("labelPrice"),
    labelCategory: tForm("labelCategory"),
    placeholderCategory: tForm("placeholderCategory"),
    minStockLabel: tForm("minStockLabel"),
    descriptionLabel: tForm("descriptionLabel"),
    imageLabel: tForm("imageLabel"),
    saveButton: tForm("saveButton"),
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">
              {updateProductPageTranslations.breadcrumb.products}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {updateProductPageTranslations.breadcrumb.edit}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormUpdate sku={sku} translations={formTranslations} />
    </div>
  )
}

export default UpdatePage
