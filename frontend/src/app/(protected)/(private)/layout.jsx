import { AppSidebar } from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

function LayoutPrivate({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4 pb-4">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default LayoutPrivate
