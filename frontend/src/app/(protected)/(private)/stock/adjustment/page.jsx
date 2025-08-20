"use client"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

const products = [
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
]

function AdjustmentsPage() {
  const [form, setForm] = useState({
    product: null,
  })
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Adjustment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Form>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Adjustments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="increase">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increase">Increase +</SelectItem>
                        <SelectItem value="decrease">Decrease -</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="found">Found</SelectItem>
                      <SelectItem value="correction">Corection</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <div className="flex gap-10">
                  <Label>Product:</Label>
                  <p className="text-sm">
                    {form.product
                      ? form.product?.name
                      : "Haven't selected a product yet"}
                  </p>
                </div>
                <div className="relative flex-1 h-max">
                  <div className="absolute top-0 bottom-0 left-2 flex items-center">
                    <SearchIcon className="size-4" />
                  </div>
                  <Input
                    className="pl-8 w-full"
                    type="search"
                    placeholder="Search products by SKU or name"
                  />
                </div>
              </div>

              <div className="border rounded-lg max-h-48 overflow-y-auto mt-2">
                {products.map((product) => (
                  <button
                    className="block w-full"
                    key={product._id}
                    onClick={() => setForm({ ...form, product })}
                  >
                    <div
                      className={`p-3 cursor-pointer hover:bg-secondary flex justify-between items-center ${
                        form.product && form.product._id === product._id
                          ? "bg-secondary border-l-4 border-l-primary"
                          : ""
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.sku}
                        </p>
                      </div>
                      <Badge variant="outline">Stok: {product.stock}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default AdjustmentsPage
