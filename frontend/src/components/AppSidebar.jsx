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
  BoxIcon,
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
import { Link } from "@/i18n/navigation"
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
      { title: "Stock", url: "/stock", icon: BoxIcon },
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
    label: "Analysis & More",
    items: [
      { title: "Analysis", url: "/analysis", icon: ChartAreaIcon },
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
              <div>
                <PackageIcon className="size-5 text-indigo-600" />
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
