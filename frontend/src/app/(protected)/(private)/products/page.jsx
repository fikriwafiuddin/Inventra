"use client"

import { Input } from "@/components/ui/input"
import Stats from "./Stats"
import {
  ArrowUpDown,
  EditIcon,
  EyeIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/DataTable"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatters"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import FormProduct from "./FormProduct"
import FloatingSelectionActions from "@/components/FloatingSelectionActions"
import AppPagination from "@/components/AppPagination"
import columnProducts from "./columnProducts"

const categories = [
  {
    label: "Motherboard",
    _id: "111",
  },
  {
    label: "CPU",
    _id: "222",
  },
  {
    label: "GPU",
    _id: "333",
  },
  {
    label: "RAM",
    _id: "444",
  },
  {
    label: "PSU",
    _id: "555",
  },
]

const products = [
  {
    _id: 12,
    sku: "PSU-001",
    name: "Corsair CV55 550 Watt 80 Plus",
    image: "/products/Corsair CV550 550 Watt 80 Plus.jpg",
    price: 700000,
    stock: 5,
    sold: 100,
  },
  {
    _id: 13,
    sku: "MOB-001",
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    price: 1600000,
    stock: 10,
    sold: 90,
  },
  {
    _id: 14,
    sku: "GPU-001",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    price: 5000000000,
    stock: 15,
    sold: 85,
  },
  {
    _id: 15,
    sku: "RAM-001",
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    price: 400000,
    stock: 3,
    sold: 73,
  },
  {
    _id: 16,
    sku: "MOU-001",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    price: 150000,
    stock: 30,
    sold: 65,
  },
  {
    _id: 12,
    sku: "PSU-001",
    name: "Corsair CV55 550 Watt 80 Plus",
    image: "/products/Corsair CV550 550 Watt 80 Plus.jpg",
    price: 700000,
    stock: 5,
    sold: 100,
  },
  {
    _id: 13,
    sku: "MOB-001",
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    price: 1600000,
    stock: 10,
    sold: 90,
  },
  {
    _id: 14,
    sku: "GPU-001",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    price: 5000000000,
    stock: 15,
    sold: 85,
  },
  {
    _id: 15,
    sku: "RAM-001",
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    price: 400000,
    stock: 3,
    sold: 73,
  },
  {
    _id: 16,
    sku: "MOU-001",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    price: 150000,
    stock: 30,
    sold: 65,
  },
]

function ProductsPage() {
  return (
    <div className="space-y-4">
      {/* STATS */}
      <Stats />

      <div className="space-y-2">
        {/* ADD PRODUCT */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>+ Add Product</Button>
          </SheetTrigger>
          <FormProduct />
        </Sheet>

        {/* FILTER */}
        <div className="flex gap-2">
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
          {/* SELECT BY CATEGORY */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TABLE PRODUCTS */}
      <DataTable columns={columnProducts} data={products} />
      <AppPagination />
    </div>
  )
}

export default ProductsPage
