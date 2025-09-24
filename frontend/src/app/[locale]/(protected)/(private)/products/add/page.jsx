import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import FormAdd from "./FormAdd"
import { useTranslations } from "next-intl"

function AddPage() {
  const tAddProductPage = useTranslations("AddProductPage")
  const breadcrumbTranslations = {
    products: tAddProductPage("breadcrumb.products"),
    add: tAddProductPage("breadcrumb.add"),
  }

  const tFrom = useTranslations("FormProduct")
  const formTranslations = {
    labelName: tFrom("labelName"),
    placeholderName: tFrom("placeholderName"),
    labelPrice: tFrom("labelPrice"),
    labelCategory: tFrom("labelCategory"),
    placeholderCategory: tFrom("placeholderCategory"),
    minStockLabel: tFrom("minStockLabel"),
    descriptionLabel: tFrom("descriptionLabel"),
    imageLabel: tFrom("imageLabel"),
    saveButton: tFrom("saveButton"),
  }
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">
              {breadcrumbTranslations.products}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumbTranslations.add}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormAdd translations={formTranslations} />
    </div>
  )
}

export default AddPage
