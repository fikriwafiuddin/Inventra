import {
  BoxIcon,
  CalendarIcon,
  ChartAreaIcon,
  FolderClosedIcon,
  InboxIcon,
  LayoutDashboardIcon,
  Settings,
  ShoppingCartIcon,
  TouchpadIcon,
  TruckIcon,
} from "lucide-react"

const navLinks = [
  {
    label: "",
    items: [
      {
        label: "",
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    label: "Master Data",
    items: [
      { title: "Products", url: "/products", icon: InboxIcon },
      { title: "Categories", url: "/categories", icon: FolderClosedIcon },
      { title: "Suppliers", url: "/suppliers", icon: TruckIcon },
      { title: "Stock", url: "/stock", icon: BoxIcon },
    ],
  },
  {
    label: "Transaction",
    items: [
      { title: "POS", url: "/pos", icon: TouchpadIcon },
      { title: "Orders", url: "/orders", icon: CalendarIcon },
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

export default navLinks
