"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { use, useEffect, useState } from "react"
import Image from "next/image"
import { useGetAllCategories } from "@/services/hooks/category-hook"
import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import productValidation from "@/lib/validations/product-validation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  useDetailProduct,
  useUpdateProduct,
} from "@/services/hooks/product-hook"
import { redirect } from "next/navigation"

function UpdatePage({ params }) {
  const { sku } = use(params)

  const form = useForm({
    resolver: zodResolver(productValidation.update),
    defaultValues: {
      name: "",
      price: 0,
      minStock: 0,
      description: "",
      image: undefined,
    },
  })
  const [previewImg, setPreviewImg] = useState(null)
  const [image, setImage] = useState(undefined)
  const { isPending, data: categories } = useGetAllCategories()
  const {
    mutate: saveProduct,
    isPending: saving,
    isSuccess,
  } = useUpdateProduct()

  const {
    isPending: takingProduct,
    data: product,
    error,
  } = useDetailProduct(sku)

  useEffect(() => {
    if (product) {
      form.setValue("name", product.name)
      form.setValue("description", product.description)
      form.setValue("price", product.price)
      form.setValue("category", product.category._id)
      form.setValue("minStock", product.minStock)
      setPreviewImg(product.image.url)
    }
  }, [product])

  const onSubmit = (data) => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }
    formData.delete("image")
    if (image) formData.set("image", image)
    formData.append("id", product._id)
    saveProduct(formData)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImg(imageUrl)
      form.setValue("image", file)
      setImage(file)
    }
  }

  if (isSuccess) {
    redirect("/products")
  }

  if (takingProduct) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-center mt-4">
        {error.response?.data.message ||
          error.message ||
          "An error occurred while fetching categories."}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-4">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={product.category._id}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              isPending ? "Loading..." : "Select category"
                            }
                            disabled={isPending}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="min stock" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
                {previewImg && (
                  <div className="relative size-36 rounded-sm overflow-hidden">
                    <Image
                      src={previewImg}
                      fill
                      alt="Preview"
                      className="object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button disabled={saving} type="submit" className="mr-4">
            {saving ? <Loader2Icon className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdatePage
