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
    labelKey: "nav.dashboard.title",
    items: [
      {
        titleKey: "nav.dashboard.dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    labelKey: "nav.masterData.title",
    items: [
      {
        titleKey: "nav.masterData.products",
        url: "/products",
        icon: Inbox,
      },
      {
        titleKey: "nav.masterData.categories",
        url: "/categories",
        icon: FolderClosedIcon,
      },
      {
        titleKey: "nav.masterData.suppliers",
        url: "/suppliers",
        icon: TruckIcon,
      },
      {
        titleKey: "nav.masterData.stock",
        url: "/stock",
        icon: BoxIcon,
      },
    ],
  },
  {
    labelKey: "nav.transaction.title",
    items: [
      { titleKey: "nav.transaction.pos", url: "/pos", icon: TouchpadIcon },
      { titleKey: "nav.transaction.orders", url: "/orders", icon: Calendar },
      {
        titleKey: "nav.transaction.purchases",
        url: "/purchases",
        icon: ShoppingCartIcon,
      },
    ],
  },
  {
    labelKey: "nav.analysis.title",
    items: [
      {
        titleKey: "nav.analysis.analysis",
        url: "/analysis",
        icon: ChartAreaIcon,
      },
      { titleKey: "nav.analysis.settings", url: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar({ transalations }) {
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
          <SidebarGroup key={group.labelKey}>
            {group.labelKey && (
              <SidebarGroupLabel>
                {transalations[group.labelKey]}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname.includes(item.url) &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{transalations[item.titleKey]}</span>
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
