import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormSupplierReturn from "./FormSupplierReturn"
import History from "./History"
import { useTranslations } from "next-intl"

const SupplierReturnPage = () => {
  const t = useTranslations("SupplierReturnsPage")

  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      supplierReturns: t("breadcrumb.supplierReturns"),
    },
    tabs: {
      return: t("tabs.return"),
      history: t("tabs.history"),
    },
    form: {
      searchTitle: t("form.searchTitle"),
      invoice: t("form.invoice"),
      searchPlaceholder: t("form.searchPlaceholder"),
      searchButton: t("form.searchButton"),
      transactionSummary: t("form.transactionSummary"),
      transactionInfo: t("form.transactionInfo"),
      date: t("form.date"),
      totalTransaction: t("form.totalTransaction"),
      statistics: t("form.statistics"),
      itemsCount: t("form.itemsCount"),
      totalUnits: t("form.totalUnits"),
      returnItems: t("form.returnItems"),
      product: t("form.product"),
      qtyPurchased: t("form.qtyPurchased"),
      qtyReturn: t("form.qtyReturn"),
      condition: t("form.condition"),
      conditionPlaceholder: t("form.conditionPlaceholder"),
      conditionOptions: {
        good: t("form.conditionOptions.good"),
        damaged: t("form.conditionOptions.damaged"),
        defective: t("form.conditionOptions.defective"),
      },
      returnSummary: t("form.returnSummary"),
      totalReturnItems: t("form.totalReturnItems"),
      totalReturn: t("form.totalReturn"),
      notes: t("form.notes"),
      notesPlaceholder: t("form.notesPlaceholder"),
      cancel: t("form.cancel"),
      processReturn: t("form.processReturn"),
    },
    help: {
      title: t("help.title"),
      step1: t("help.step1"),
      step2: t("help.step2"),
      step3: t("help.step3"),
    },
    history: {
      from: t("history.from"),
      to: t("history.to"),
      error: t("history.error"),
    },
    table: {
      invoice: t("table.invoice"),
      totalRefund: t("table.totalRefund"),
      date: t("table.date"),
      actions: t("table.actions"),
      viewDetails: t("table.viewDetails"),
      items: t("table.items"),
      close: t("table.close"),
    },
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">
              {translations.breadcrumb.stock}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {translations.breadcrumb.supplierReturns}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="return">
        <TabsList>
          <TabsTrigger value="return">{translations.tabs.return}</TabsTrigger>
          <TabsTrigger value="history">{translations.tabs.history}</TabsTrigger>
        </TabsList>
        <TabsContent value="return">
          <FormSupplierReturn translations={translations} />
        </TabsContent>
        <TabsContent value="history">
          <History translations={translations} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SupplierReturnPage
