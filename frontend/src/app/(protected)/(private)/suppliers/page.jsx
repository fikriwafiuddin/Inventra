import React from "react"
import Stats from "./Stats"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import FormSupplier from "./FormSupplier"
import SuppliersTable from "./SuppliersTable"

const suppliers = [
  {
    id: "1",
    name: "TechnoSupply Corp",
    contactName: "John Smith",
    email: "john@technosupply.com",
    phone: "+1-555-0123",
    address: "123 Business St",
    city: "New York",
    country: "United States",
    taxId: "US123456789",
    paymentTerms: "Net 30",
    status: "active",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "Global Materials Ltd",
    contactName: "Sarah Johnson",
    email: "sarah@globalmaterials.com",
    phone: "+44-20-7946-0958",
    address: "456 Industrial Ave",
    city: "London",
    country: "United Kingdom",
    taxId: "GB987654321",
    paymentTerms: "Net 15",
    status: "active",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
  },
  {
    id: "3",
    name: "Premium Parts Inc",
    contactName: "Michael Chen",
    email: "michael@premiumparts.com",
    phone: "+1-555-0187",
    address: "789 Commerce Blvd",
    city: "Los Angeles",
    country: "United States",
    taxId: "US555777999",
    paymentTerms: "Net 45",
    status: "inactive",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-25T08:20:00Z",
  },
  {
    id: "4",
    name: "Euro Components",
    contactName: "Anna Mueller",
    email: "anna@eurocomponents.de",
    phone: "+49-30-12345678",
    address: "321 Industrie Str",
    city: "Berlin",
    country: "Germany",
    taxId: "DE111222333",
    paymentTerms: "Net 30",
    status: "active",
    createdAt: "2024-01-08T12:00:00Z",
    updatedAt: "2024-01-18T15:30:00Z",
  },
  {
    id: "5",
    name: "Pacific Suppliers",
    contactName: "Hiroshi Tanaka",
    email: "hiroshi@pacificsuppliers.jp",
    phone: "+81-3-1234-5678",
    address: "654 Business District",
    city: "Tokyo",
    country: "Japan",
    taxId: "JP444555666",
    paymentTerms: "Net 60",
    status: "active",
    createdAt: "2024-01-12T10:15:00Z",
    updatedAt: "2024-01-22T13:45:00Z",
  },
]

function SuppliersPage() {
  return (
    <div className="space-y-4">
      <Stats />

      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>+ Add Category</Button>
          </SheetTrigger>
          <FormSupplier />
        </Sheet>

        {/* FILTER */}
        <div className="">
          {/* SEARCH */}
          <div className="relative flex-1 h-max">
            <div className="absolute top-0 bottom-0 left-2 flex items-center">
              <SearchIcon className="size-4" />
            </div>
            <Input
              className="pl-8 w-full"
              type="search"
              placeholder="Search products"
            />
          </div>
        </div>
      </div>

      <SuppliersTable />
    </div>
  )
}

export default SuppliersPage
