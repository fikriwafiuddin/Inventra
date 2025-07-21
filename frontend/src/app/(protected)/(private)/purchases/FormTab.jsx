"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusSquareIcon, XIcon } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import purchaseValidation from "@/lib/validations/purchase-validation"

const suppliers = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
    _id: "5",
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

const products = [
  {
    _id: "12",
    name: "Corsair CV55 550 Watt 80 Plus",
  },
  {
    _id: "13",
    name: "TUF GAMING Z690-PLUS WIFI D4",
  },
  {
    _id: "14",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
  },
  {
    _id: "15",
    name: "Kingston FURY Impact DDR4",
  },
  {
    _id: "16",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
  },
]

function FormTab() {
  const form = useForm({
    resolver: zodResolver(purchaseValidation.addPurchase),
    defaultValues: {
      supplier: "",
      fracture: "",
      date: "",
      items: [{ product: "", quantity: 0, totalPrice: 0 }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const handleAddItem = () => {
    append({ product: "", quantity: 0, totalPrice: 0 })
  }

  const handleRemoveItem = (index) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Input Supplier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <FormLabel>Choose Supplier</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose supplier" />
                            </SelectTrigger>
                            <SelectContent>
                              {suppliers.map((supplier) => (
                                <SelectItem
                                  key={supplier._id}
                                  value={supplier._id}
                                >
                                  {supplier.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fracture"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <FormLabel>Fracture</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="fracture"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Input Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((fieldItem, index) => (
                  <div className="" key={fieldItem.id}>
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold">Item {index + 1}:</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <XIcon />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`items.${index}.product`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="space-y-2">
                              <FormLabel>Product</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {products.map((product) => (
                                      <SelectItem
                                        key={product._id}
                                        value={product._id}
                                      >
                                        {product.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="space-y-2">
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.totalPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="space-y-2">
                              <FormLabel>Total Price</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                className="mt-4 ml-auto block"
                variant="outline"
                onClick={handleAddItem}
              >
                <PlusSquareIcon />
              </Button>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  )
}

export default FormTab
