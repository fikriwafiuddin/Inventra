import { AppSidebar } from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

function LayoutPrivate({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4 pb-4">
        <Navbar />
        <Providers>{children}</Providers>
      </main>
    </SidebarProvider>
  )
}

export default LayoutPrivate
