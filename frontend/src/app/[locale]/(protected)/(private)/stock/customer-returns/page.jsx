import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import History from "./History"
import FormCustomerReturn from "./FormCustomerReturn"
import { useTranslations } from "next-intl"

const CustomerReturnPage = () => {
  const t = useTranslations("CustomerReturnsPage")
  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      customerReturns: t("breadcrumb.customerReturns"),
    },
    tabs: {
      return: t("tabs.return"),
      history: t("tabs.history"),
    },
    form: {
      searchTitle: t("form.searchTitle"),
      orderId: t("form.orderId"),
      searchPlaceholder: t("form.searchPlaceholder"),
      searchButton: t("form.searchButton"),
      transactionSummary: t("form.transactionSummary"),
      transactionInfo: t("form.transactionInfo"),
      invoice: t("form.invoice"),
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
      returnPrice: t("form.returnPrice"),
      subtotal: t("form.subtotal"),
      conditionOptions: {
        good: t("form.conditionOptions.good"),
        damaged: t("form.conditionOptions.damaged"),
        defective: t("form.conditionOptions.defective"),
      },
      returnSummary: t("form.returnSummary"),
      totalReturnItems: t("form.totalReturnItems"),
      totalRefund: t("form.totalRefund"),
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
      orderId: t("table.orderId"),
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
              {translations.breadcrumb.customerReturns}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="return" className="">
        <TabsList>
          <TabsTrigger value="return">{translations.tabs.return}</TabsTrigger>
          <TabsTrigger value="history">{translations.tabs.history}</TabsTrigger>
        </TabsList>
        <TabsContent value="return">
          <FormCustomerReturn translations={translations} />
        </TabsContent>
        <TabsContent value="history">
          <History translations={translations} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CustomerReturnPage
