// "use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormAdjustment from "./FormAdjustment"
import History from "./History"
import { useTranslations } from "next-intl"

function AdjustmentsPage() {
  const t = useTranslations("AdjustmentStockPage")
  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      adjustment: t("breadcrumb.adjustment"),
    },
    tabs: {
      adjustment: t("tabs.adjustment"),
      history: t("tabs.history"),
    },
    form: {
      title: t("form.title"),
      label: {
        quantity: t("form.label.quantity"),
        reason: t("form.label.reason"),
        product: t("form.label.product"),
      },
      placeholder: {
        reason: t("form.placeholder.reason"),
        product: t("form.placeholder.product"),
        customReason: t("form.placeholder.customReason"),
      },
      counterSelect: {
        increase: t("form.counterSelect.increase"),
        decrease: t("form.counterSelect.decrease"),
      },
      reason: {
        damaged: t("reason.damaged"),
        lost: t("reason.lost"),
        found: t("reason.found"),
        correction: t("reason.correction"),
        custom: t("reason.custom"),
      },
      buttonSave: t("form.buttonSave"),
    },
    history: {
      filter: {
        from: t("history.filter.from"),
        to: t("history.filter.To"),
      },
      historiesTable: {
        tableHead: {
          product: t("history.historiesTable.tableHead.product"),
          quantity: t("history.historiesTable.tableHead.quantity"),
          date: t("history.historiesTable.tableHead.date"),
          reason: t("history.historiesTable.tableHead.reason"),
        },
        reason: {
          damaged: t("reason.damaged"),
          lost: t("reason.lost"),
          found: t("reason.found"),
          correction: t("reason.correction"),
          custom: t("reason.custom"),
        },
      },
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
            <BreadcrumbPage>
              {translations.breadcrumb.adjustment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="adjustment" className="">
        <TabsList>
          <TabsTrigger value="adjustment">
            {translations.tabs.adjustment}
          </TabsTrigger>
          <TabsTrigger value="history">{translations.tabs.history}</TabsTrigger>
        </TabsList>
        <TabsContent value="adjustment">
          <FormAdjustment translations={translations.form} />
        </TabsContent>
        <TabsContent value="history">
          <History translations={translations.history} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdjustmentsPage
