import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Opname from "./Opname"
import { getTranslations } from "next-intl/server"

async function DetailOpnamePage({ params }) {
  const { id } = await params
  const t = await getTranslations("DetailOpnamePage")

  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      opname: t("breadcrumb.opname"),
      details: t("breadcrumb.details"),
    },
    opname: {
      error: t("opname.error"),
      loading: t("opname.loading"),
    },
    details: {
      title: t("details.title"),
      sessionInfo: t("details.sessionInfo"),
      startDate: t("details.startDate"),
      endDate: t("details.endDate"),
      status: t("details.status"),
      statistics: t("details.statistics"),
      totalProducts: t("details.totalProducts"),
      productsWithDifference: t("details.productsWithDifference"),
      totalDifferenceValue: t("details.totalDifferenceValue"),
      overallDifference: t("details.overallDifference"),
      reportTitle: t("details.reportTitle"),
      adjustStock: t("details.adjustStock"),
      exportReport: t("details.exportReport"),
    },
    counting: {
      title: t("counting.title"),
      sessionStarted: t("counting.sessionStarted"),
      inProgress: t("counting.inProgress"),
      countInput: t("counting.countInput"),
      searchProduct: t("counting.searchProduct"),
      searchPlaceholder: t("counting.searchPlaceholder"),
      systemStock: t("counting.systemStock"),
      dialog: {
        label: t("counting.dialog.label"),
        placeholder: t("counting.dialog.placeholder"),
        addButton: t("counting.dialog.addButton"),
      },
      progressTitle: t("counting.progressTitle"),
      countedProducts: t("counting.countedProducts"),
      saveTemp: t("counting.saveTemp"),
      completeSession: t("counting.completeSession"),
      countedList: t("counting.countedList"),
    },
    table: {
      name: t("countingTable.name"),
      systemStock: t("countingTable.systemStock"),
      physicalStock: t("countingTable.physicalStock"),
      difference: t("countingTable.difference"),
      differenceValue: t("countingTable.differenceValue"),
      status: t("countingTable.status"),
      statusMatch: t("countingTable.statusMatch"),
      statusMismatch: t("countingTable.statusMismatch"),
    },
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">
              {translations.breadcrumb.stock}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock/opname">
              {translations.breadcrumb.opname}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{translations.breadcrumb.details}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Opname id={id} translations={translations} />
    </div>
  )
}

export default DetailOpnamePage
