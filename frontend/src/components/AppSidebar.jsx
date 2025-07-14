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

const navLinks = [
  {
    label: "",
    items: [
      {
        label: "",
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Mater Data",
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
  {
    label: "Analytics & More",
    items: [
      { title: "Reports", url: "/reports", icon: ChartAreaIcon },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Avatar className="size-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Inventra</span>
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
                    <SidebarMenuButton asChild>
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
