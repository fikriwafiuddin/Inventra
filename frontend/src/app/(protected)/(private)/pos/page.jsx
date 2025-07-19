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
import {
  MinusSquareIcon,
  PlusSquareIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

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
    description: "This is a description of the product.",
    category: "PSU",
  },
  {
    _id: 13,
    sku: "MOB-001",
    name: "TUF GAMING Z690-PLUS WIFI D4",
    image: "/products/TUF GAMING Z690-PLUS WIFI D4(1).jpg",
    price: 1600000,
    stock: 10,
    sold: 90,
    description: "This is a description of the product.",
    category: "Motherboard",
  },
  {
    _id: 14,
    sku: "GPU-001",
    name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
    image: "/products/GeForce RTX™ 3060 VENTUS 2X 12G OC(2).png",
    price: 5000000000,
    stock: 15,
    sold: 85,
    description: "This is a description of the product.",
    category: "GPU",
  },
  {
    _id: 15,
    sku: "RAM-001",
    name: "Kingston FURY Impact DDR4",
    image: "/products/Kingston FURY Impact DDR4(2).jpg",
    price: 400000,
    stock: 3,
    sold: 73,
    description: "This is a description of the product.",
    category: "ram",
  },
  {
    _id: 16,
    sku: "MOU-001",
    name: "Rexus Mouse Wireless Gaming Xierra 108",
    image: "/products/Rexus Mouse Wireless Gaming Xierra 108(1).jpg",
    price: 150000,
    stock: 0,
    sold: 0,
    description: "This is a description of the product.",
    category: "mouse",
  },
]

function PosPage() {
  const [cart, setCart] = useState([])

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
  return (
    <div className="space-y-4">
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

      {/* CART */}
      <div className="flex justify-end items-center gap-2 relative">
        {cart.length} selected
        <Sheet>
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
                      src={product.image}
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
                  disabled={cart.length == 0}
                  className="w-full"
                  variant="outline"
                  onClick={() => setSelectedProduct([])}
                >
                  Pay
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id} className="px-1">
            <div className="relative rounded-sm overflow-hidden h-48 p-1">
              <Image
                src={product.image}
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
              <p className="text-xs text-muted-foreground font-medium mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-1">
                <span>{formatCurrency(product.price)}</span>
                <span className="text-xs font-medium">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => addToCart(product)}
                  disabled={product.stock == 0}
                >
                  Add to Cart
                </Button>
                <Button>Show</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PosPage
