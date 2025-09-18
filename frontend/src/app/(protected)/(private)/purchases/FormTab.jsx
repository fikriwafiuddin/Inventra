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
  Check,
  ChevronsUpDownIcon,
  Loader2Icon,
  PlusSquareIcon,
  XIcon,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import purchaseValidation from "@/lib/validations/purchase-validation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useSearchSuppliers } from "@/services/hooks/supplier-hook"
import { useSearchProducts } from "@/services/hooks/product-hook"
import { useAddPurchase } from "@/services/hooks/purchase-hook"
import { Badge } from "@/components/ui/badge"

function FormTab() {
  const form = useForm({
    resolver: zodResolver(purchaseValidation.addPurchase),
    defaultValues: {
      supplier: "",
      invoice: "",
      date: "",
      items: [{ product: "", quantity: 0, totalPrice: 0 }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [selectedProducts, setSelectedproducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTermProduct, setSearchTermProduct] = useState("")
  const { isPending: loadingSuppliers, data: suppliers } =
    useSearchSuppliers(searchTerm)
  const { isPending: loadingProducts, data: products } =
    useSearchProducts(searchTermProduct)
  const { isPending: saving, mutate: save } = useAddPurchase()

  const handleAddItem = () => {
    append({ product: "", name: "", quantity: 0, totalPrice: 0 })
  }

  const handleRemoveItem = (index) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = (data) => {
    save(data)
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
                        <FormLabel>Supplier</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between w-full",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? selectedSupplier?.name
                                  : "Select supplier"}
                                <ChevronsUpDownIcon className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command filter={() => 1}>
                              <CommandInput
                                placeholder="Search supplier..."
                                className="h-9"
                                onValueChange={(value) => setSearchTerm(value)}
                              />
                              <CommandList>
                                {loadingSuppliers && (
                                  <div className="flex items-center justify-center py-2">
                                    <Loader2Icon className="h-4 w-4 animate-spin" />
                                  </div>
                                )}
                                {!loadingSuppliers &&
                                  suppliers?.length === 0 && (
                                    <CommandEmpty>
                                      Tidak ada supplier yang ditemukan.
                                    </CommandEmpty>
                                  )}
                                <CommandGroup>
                                  {suppliers?.map((supplier) => (
                                    <CommandItem
                                      disabled={supplier.status === "inactive"}
                                      value={supplier._id}
                                      key={supplier._id}
                                      onSelect={() => {
                                        field.onChange(supplier._id)
                                        setSelectedSupplier(supplier)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          supplier._id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {supplier.name}
                                      {supplier.status === "active" ? (
                                        <Badge variant="success">Active</Badge>
                                      ) : (
                                        <Badge variant="destructive">
                                          Inactive
                                        </Badge>
                                      )}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoice"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <FormLabel>Invoice</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="invoice" {...field} />
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
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "justify-between w-full",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? selectedProducts[index]
                                        : "Select product"}
                                      <ChevronsUpDownIcon className="opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                  <Command filter={() => 1}>
                                    <CommandInput
                                      placeholder="Search product..."
                                      className="h-9"
                                      onValueChange={(value) =>
                                        setSearchTermProduct(value)
                                      }
                                    />
                                    <CommandList>
                                      {loadingProducts && (
                                        <div className="flex items-center justify-center py-2">
                                          <Loader2Icon className="h-4 w-4 animate-spin" />
                                        </div>
                                      )}
                                      {!loadingProducts &&
                                        products?.length === 0 && (
                                          <CommandEmpty>
                                            Tidak ada product yang ditemukan.
                                          </CommandEmpty>
                                        )}
                                      <CommandGroup>
                                        {products?.map((product) => (
                                          <CommandItem
                                            value={product._id}
                                            key={product._id}
                                            onSelect={() => {
                                              field.onChange(product._id)
                                              setSelectedproducts((prev) => {
                                                const updated = [...prev]
                                                updated[index] = product.name
                                                return updated
                                              })
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                product._id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {product.name}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
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
              <Button disabled={saving} type="submit">
                {saving ? <Loader2Icon className="animate-spin" /> : "Save"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  )
}

export default FormTab
