import { AppSidebar } from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

function LayoutPrivate({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
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
