"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import History from "./History"
import FormOpname from "./Form"
import { useTranslations } from "next-intl"

const StockOpnamePage = () => {
  const t = useTranslations("StockOpnamePage")

  const translations = {
    breadcrumb: {
      stock: t("breadcrumb.stock"),
      opname: t("breadcrumb.opname"),
    },
    header: {
      title: t("header.title"),
      subtitle: t("header.subtitle"),
    },
    dialog: {
      button: t("dialog.button"),
      title: t("dialog.title"),
      description: t("dialog.description"),
    },
    form: {
      nameLabel: t("form.nameLabel"),
      namePlaceholder: t("form.namePlaceholder"),
      startButton: t("form.startButton"),
    },
    history: {
      from: t("history.from"),
      to: t("history.to"),
      selectDate: t("history.selectDate"),
      selectStatus: t("history.selectStatus"),
      categories: t("history.categories"),
      all: t("history.all"),
      completed: t("history.completed"),
      incomplete: t("history.incomplete"),
      listTitle: t("history.listTitle"),
      error: t("history.error"),
    },
    table: {
      name: t("table.name"),
      startDate: t("table.startDate"),
      endDate: t("table.endDate"),
      status: t("table.status"),
      completed: t("table.completed"),
      incomplete: t("table.incomplete"),
      productsCount: t("table.productsCount"),
      totalDifference: t("table.totalDifference"),
      actions: t("table.actions"),
      continue: t("table.continue"),
      viewDetails: t("table.viewDetails"),
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
            <BreadcrumbPage>{translations.breadcrumb.opname}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{translations.header.title}</h1>
          <p className="text-muted-foreground">
            {translations.header.subtitle}
          </p>
        </div>

        {/* Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {translations.dialog.button}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{translations.dialog.title}</DialogTitle>
              <DialogDescription>
                {translations.dialog.description}
              </DialogDescription>
            </DialogHeader>
            <FormOpname translations={translations.form} />
          </DialogContent>
        </Dialog>
      </div>

      {/* History */}
      <History
        translations={translations.history}
        tableTranslations={translations.table}
      />
    </div>
  )
}

export default StockOpnamePage
