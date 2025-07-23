"use client"

import {
  Calendar,
  LayoutDashboard,
  Inbox,
  ShoppingCartIcon,
  Settings,
  ChartAreaIcon,
  FolderClosedIcon,
  TruckIcon,
  TouchpadIcon,
  PackageIcon,
  HistoryIcon,
  ClipboardListIcon,
  ArrowRightFromLineIcon,
  ArrowLeftFromLineIcon,
  PackageCheckIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  {
    label: "",
    items: [
      {
        label: "",
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Master Data",
    items: [
      { title: "Products", url: "/products", icon: Inbox },
      { title: "Categories", url: "/categories", icon: FolderClosedIcon },
      { title: "Suppliers", url: "/suppliers", icon: TruckIcon },
    ],
  },
  {
    label: "Transaction",
    items: [
      { title: "POS", url: "/pos", icon: TouchpadIcon },
      { title: "Orders", url: "/orders", icon: Calendar },
      { title: "Purchases", url: "/purchases", icon: ShoppingCartIcon },
    ],
  },
  ,
  {
    label: "Inventory Management",
    items: [
      {
        title: "Stock Adjustments",
        url: "/stock-adjustments",
        icon: PackageCheckIcon,
      },
      {
        title: "Customer Returns",
        url: "/customer-returns",
        icon: ArrowLeftFromLineIcon,
      },
      {
        title: "Supplier Returns",
        url: "/supplier-returns",
        icon: ArrowRightFromLineIcon,
      },
      { title: "Stock Opname", url: "/stock-opname", icon: ClipboardListIcon },
      { title: "Stock History", url: "/stock-history", icon: HistoryIcon },
    ],
  },
  {
    label: "Analytics & More",
    items: [
      { title: "Reports", url: "/reports", icon: ChartAreaIcon },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <PackageIcon className="size-5 text-white" />
              </div>
              <span className="font-medium text-lg">Inventra</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {navLinks.map((group) => (
          <SidebarGroup key={group.label}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname.includes(item.url) &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
