import { AppSidebar } from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import React from "react"

function LayoutPrivate({ children }) {
  const t = useTranslations("Sidebar")
  const translations = {
    "nav.dashboard.title": t("nav.dashboard.title"),
    "nav.dashboard.dashboard": t("nav.dashboard.dashboard"),
    "nav.masterData.title": t("nav.masterData.title"),
    "nav.masterData.products": t("nav.masterData.products"),
    "nav.masterData.categories": t("nav.masterData.categories"),
    "nav.masterData.suppliers": t("nav.masterData.suppliers"),
    "nav.masterData.stock": t("nav.masterData.stock"),
    "nav.transaction.title": t("nav.transaction.title"),
    "nav.transaction.pos": t("nav.transaction.pos"),
    "nav.transaction.orders": t("nav.transaction.orders"),
    "nav.transaction.purchases": t("nav.transaction.purchases"),
    "nav.analysis.title": t("nav.analysis.title"),
    "nav.analysis.analysis": t("nav.analysis.analysis"),
    "nav.analysis.settings": t("nav.analysis.settings"),
  }

  return (
    <SidebarProvider>
      <AppSidebar transalations={translations} />
      <SidebarInset className="overflow-hidden">
        <main className="flex-1 px-4 pb-4">
          <Navbar />
          <Providers>{children}</Providers>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutPrivate
