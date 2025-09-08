"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatCurrency } from "@/lib/formatters"
import { useAddOrder } from "@/services/hooks/order-hook"
import { useGetAllProducts } from "@/services/hooks/product-hook"
import {
  Loader2Icon,
  MinusSquareIcon,
  PlusSquareIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { useGetAllCategories } from "@/services/hooks/category-hook"
import AppPagination from "@/components/AppPagination"
import ReceiptModal from "./ReceiptModal"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

function PosPage() {
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [currentOrderData, setCurrentOrderData] = useState(null)
  const [openCart, setOpenCart] = useState(false)
  const { isPending, data, error } = useGetAllProducts(
    page,
    category,
    search,
    12
  )
  const { isPending: paying, mutate: pay } = useAddOrder()
  const { isPending: fetchingCategories, data: categories } =
    useGetAllCategories()
  const { user, isLoaded } = useUser()

  const handleSearch = (e) => {
    setPage(1)
    setSearch(e.target.value)
  }

  const handleSelect = (value) => {
    setPage(1)
    setCategory(value)
  }

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id)

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
        toast.success("Successfully added to cart")
      } else {
        toast.error("Insufficient stock!")
      }
    } else {
      toast.success("Successfully added to cart")
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }

    const product = products.find((p) => p._id === productId)
    if (newQuantity > product.stock) {
      toast.error("Insufficient stock!")
      return
    }

    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = () => {
    const data = {
      items: cart,
      date: new Date(),
    }
    pay(data, {
      onSuccess: (data) => {
        setCurrentOrderData(data?.body?.order)
        setShowReceiptModal(true)
        setOpenCart(false)
        setCart([])
      },
    })
  }

  const handleCloseReceipt = () => {
    setShowReceiptModal(false)
    setCurrentOrderData(null)
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={handleCloseReceipt}
        orderData={currentOrderData}
        user={user}
      />

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
            onChange={handleSearch}
          />
        </div>
        {/* SELECT BY CATEGORY */}
        <Select value={category} onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {error && (
                <span className="text-center text-sm text-destructive">
                  {error}
                </span>
              )}
              {fetchingCategories && (
                <Loader2Icon className="animate-spin mx-auto my-4" />
              )}
              {categories &&
                categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* CART */}
      <div className="flex justify-end items-center gap-2 relative">
        {cart.length} selected
        <Sheet open={openCart} onOpenChange={setOpenCart}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <ShoppingCartIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <span className="flex items-center gap-2">
                  <ShoppingCartIcon /> Cart
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-2 px-2">
              {cart.map((product) => (
                <Card
                  key={product._id + "cart"}
                  className="relative flex-row items-center justify-between gap-1 p-3 2xl:p-4"
                >
                  <button
                    type="button"
                    className="absolute top-1 right-2"
                    onClick={() => removeFromCart(product._id)}
                  >
                    <XIcon className="size-4" />
                  </button>
                  <div className="size-12 rounded-sm overflow-hidden relative">
                    <Image
                      src={product.image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-0 flex-1">
                    <CardTitle className="line-clamp-1 text-xs">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm">{formatCurrency(product.price)}</p>
                  </CardContent>
                  <CardFooter className="p-1">
                    <div className="flex items-center gap-2">
                      <button
                        typr="button"
                        onClick={() =>
                          updateQuantity(product._id, product.quantity + 1)
                        }
                      >
                        <PlusSquareIcon className="size-4" />
                      </button>
                      <p>{product.quantity}</p>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product._id, product.quantity - 1)
                        }
                      >
                        <MinusSquareIcon className="size-4" />
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {cart.length == 0 && (
                <h2 className="text-center text-2xl text-muted font-medium mt-4">
                  Cart is Empty
                </h2>
              )}
            </div>
            <SheetFooter>
              <div className="space-y-4 border-t-2">
                <div className="flex items-center justify-between mt-10">
                  <span>Total:</span>
                  <span className="text-xl font-semibold">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
                <Button
                  disabled={cart.length == 0 || paying}
                  className="w-full"
                  variant="outline"
                  onClick={handleSubmit}
                >
                  {paying ? (
                    <Loader2Icon className="animate-spin size-4" />
                  ) : (
                    "Pay"
                  )}
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {error && (
        <div className="text-destructive text-center mt-4">
          {error.response?.data.message ||
            error.message ||
            "An error occurred while fetching categories."}
        </div>
      )}
      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {data?.products &&
          data.products.map((product) => (
            <Card key={product._id} className="px-1">
              <div className="relative rounded-sm overflow-hidden h-48 p-1">
                <Image
                  src={product.image.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent>
                <CardTitle>
                  <h2 className="text-sm mb-2 font-semibold line-clamp-1">
                    {product.name}
                  </h2>
                </CardTitle>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-1">
                  <span>{formatCurrency(product.price)}</span>
                  <span className="text-xs font-medium">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={product.stock == 0}
                  >
                    Add to Cart
                  </Button>
                  <Button asChild>
                    <Link href={`/pos/${product.sku}`}>Show</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {data && data.totalPages > 1 && (
        <AppPagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={data?.totalPages}
          totalData={data?.totalProducts}
          pageSize={data?.limit}
        />
      )}
    </div>
  )
}

export default PosPage
