import { Input } from "@/components/ui/input"
import FilterDate from "./FilterDate"
import { SearchIcon } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import columnPurchases from "./columnPurchases"

const purchases = [
  {
    _id: "1",
    fracture: "TRX-001",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [
      {
        product: {
          _id: "12",
          name: "Corsair CV55 550 Watt 80 Plus",
        },
        quantity: 10,
        totalPrice: 3000000,
      },
      {
        product: {
          _id: "13",
          name: "TUF GAMING Z690-PLUS WIFI D4",
        },
        quantity: 1,
        totalPrice: 200000,
      },
      {
        product: {
          _id: "14",
          name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
        },
        quantity: 2,
        totalPrice: 3000000,
      },
    ],
  },
  {
    _id: "2",
    fracture: "TRX-002",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      contactName: "John Smith",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [],
  },
  {
    _id: "3",
    fracture: "TRX-003",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      contactName: "John Smith",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [],
  },
]

function HistoryTab() {
  return (
    <div className="space-y-4">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* SEARCH */}
        <div className="relative flex-1 h-max">
          <div className="absolute top-0 bottom-0 left-2 flex items-center">
            <SearchIcon className="size-4" />
          </div>
          <Input
            className="pl-8 w-full"
            type="search"
            placeholder="Search purchases by fracture"
          />
        </div>
        <FilterDate />
      </div>
      <DataTable data={purchases} columns={columnPurchases} />
    </div>
  )
}

export default HistoryTab
