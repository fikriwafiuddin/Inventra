"use client"

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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import adjustmentValidation from "@/lib/validations/adjustment-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { Check, ChevronsUpDownIcon, Loader2Icon } from "lucide-react"
import { useSearchProducts } from "@/services/hooks/product-hook"

function AdjustmentsPage() {
  const form = useForm({
    resolver: zodResolver(adjustmentValidation.add),
  })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCustom, setIsCustom] = useState(false)
  const [type, setType] = useState("increase")
  const [searchTermProduct, setSearchTermProduct] = useState("")
  const { isPending, data: products } = useSearchProducts(searchTermProduct)

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
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Adjustments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Select onValueChange={setType} defaultValue={type}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="increase">
                                  Increase +
                                </SelectItem>
                                <SelectItem value="decrease">
                                  Decrease -
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Input type="number" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <>
                            <Select
                              onValueChange={(value) => {
                                if (value === "custom") {
                                  setIsCustom(true)
                                  field.onChange("")
                                } else {
                                  setIsCustom(false)
                                  field.onChange(value)
                                }
                              }}
                              defaultValue={isCustom ? "" : field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="damaged">Damaged</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                                <SelectItem value="found">Found</SelectItem>
                                <SelectItem value="correction">
                                  Corection
                                </SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            {isCustom && (
                              <Input
                                placeholder="Enter your custom reason"
                                {...field}
                              />
                            )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
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
                                  ? selectedProduct?.name
                                  : "Select product"}
                                <ChevronsUpDownIcon className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                            <Command filter={() => 1}>
                              <CommandInput
                                placeholder="Search supplier..."
                                className="h-9"
                                onValueChange={(value) =>
                                  setSearchTermProduct(value)
                                }
                              />
                              <CommandList>
                                {isPending && (
                                  <div className="flex items-center justify-center py-2">
                                    <Loader2Icon className="h-4 w-4 animate-spin" />
                                  </div>
                                )}
                                {!isPending && products?.length === 0 && (
                                  <CommandEmpty>
                                    Tidak ada supplier yang ditemukan.
                                  </CommandEmpty>
                                )}
                                <CommandGroup>
                                  {products?.map((product) => (
                                    <CommandItem
                                      value={product._id}
                                      key={product._id}
                                      onSelect={() => {
                                        field.onChange(product._id)
                                        setSelectedProduct(product)
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
