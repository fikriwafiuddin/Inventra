import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import FilterDate from "./FilterDate"
import { DataTable } from "@/components/DataTable"
import columnOrders from "./columnOrder"
import AppPagination from "@/components/AppPagination"

const orders = [
  {
    orderId: "ORD-2024-001",
    date: "2024-12-15",
    items: [
      { name: "Laptop Gaming ROG", quantity: 1, price: 15000000 },
      { name: "Mouse Wireless", quantity: 2, price: 250000 },
    ],
    amount: 15500000,
  },
  {
    orderId: "ORD-2024-002",
    date: "2024-12-14",
    items: [
      { name: "Keyboard Mechanical", quantity: 1, price: 800000 },
      { name: "Monitor 4K", quantity: 1, price: 3500000 },
    ],
    amount: 4300000,
  },
  {
    orderId: "ORD-2024-003",
    date: "2024-11-28",
    items: [
      { name: "Headset Gaming", quantity: 1, price: 450000 },
      { name: "Webcam HD", quantity: 1, price: 350000 },
    ],
    amount: 800000,
  },
  {
    orderId: "ORD-2024-004",
    date: "2024-11-25",
    items: [{ name: "Laptop Gaming ROG", quantity: 1, price: 15000000 }],
    amount: 15000000,
  },
  {
    orderId: "ORD-2024-005",
    date: "2024-10-20",
    items: [
      { name: "Mouse Wireless", quantity: 3, price: 250000 },
      { name: "Keyboard Mechanical", quantity: 1, price: 800000 },
    ],
    amount: 1550000,
  },
  {
    orderId: "ORD-2024-006",
    date: "2024-12-13",
    items: [{ name: "Monitor 4K", quantity: 2, price: 3500000 }],
    amount: 7000000,
  },
]

function OrdersPage() {
  return (
    <div className="space-y-4">
      {/* FILTER */}
      <div className="flex gap-4">
        {/* SEARCH */}
        <div className="relative flex-1 h-max">
          <div className="absolute top-0 bottom-0 left-2 flex items-center">
            <SearchIcon className="size-4" />
          </div>
          <Input
            className="pl-8 w-full"
            type="search"
            placeholder="Search order by id"
          />
        </div>
        <FilterDate />
      </div>

      <DataTable data={orders} columns={columnOrders} />
      {orders?.length > 10 && <AppPagination />}
    </div>
  )
}

export default OrdersPage
