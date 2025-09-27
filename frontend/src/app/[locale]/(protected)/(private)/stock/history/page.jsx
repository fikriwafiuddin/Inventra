import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import History from "./History"
import { useTranslations } from "next-intl"

function HistoryStockPage() {
  const t = useTranslations("HistoryStockPage")
  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      history: t("breadcrumb.history"),
    },
    stats: {
      totalTransactions: t("stats.totalTransactions"),
      stockIn: t("stats.stockIn"),
      stockOut: t("stats.stockOut"),
      netChange: t("stats.netChange"),
    },
    filters: {
      from: t("filters.from"),
      to: t("filters.to"),
      selectDate: t("filters.selectDate"),
      categories: t("filters.categories"),
      all: t("filters.all"),
      adjustment: t("filters.adjustment"),
      customerReturn: t("filters.customerReturn"),
      supplierReturn: t("filters.supplierReturn"),
      opname: t("filters.opname"),
      sales: t("filters.sales"),
      purchase: t("filters.purchase"),
    },
    table: {
      date: t("table.date"),
      product: t("table.product"),
      movementType: t("table.movementType"),
      sales: t("table.sales"),
      adjustment: t("table.adjustment"),
      purchase: t("table.purchase"),
      opname: t("table.opname"),
      customerReturn: t("table.customerReturn"),
      supplierReturn: t("table.supplierReturn"),
      change: t("table.change"),
      initialStock: t("table.initialStock"),
      finalStock: t("table.finalStock"),
      reason: t("table.reason"),
    },
    errors: {
      fetching: t("errors.fetching"),
    },
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">
              {translations.breadcrumb.stock}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{translations.breadcrumb.history}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <History translations={translations} />
    </div>
  )
}

export default HistoryStockPage
