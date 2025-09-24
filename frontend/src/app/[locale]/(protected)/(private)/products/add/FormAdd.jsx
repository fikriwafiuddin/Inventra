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
import { useState } from "react"
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
import { useAddProduct } from "@/services/hooks/product-hook"
import { redirect } from "next/navigation"

function FormAdd({ translations }) {
  const form = useForm({
    resolver: zodResolver(productValidation.addProduct),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      minStock: 0,
      description: "",
      image: undefined,
    },
  })
  const [previewImg, setPreviewImg] = useState(null)
  const [image, setImage] = useState(undefined)
  const { isPending, data: categories } = useGetAllCategories()
  const { mutate: saveProduct, isPending: saving, isSuccess } = useAddProduct()

  const onSubmit = (data) => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }
    formData.set("image", image)
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.labelName}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={translations.placeholderName}
                    {...field}
                  />
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
                <FormLabel>{translations.labelPrice}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
                <FormLabel>{translations.labelCategory}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isPending
                              ? "Loading..."
                              : translations.placeholderCategory
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
                <FormLabel>{translations.minStockLabel}</FormLabel>
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
              <FormLabel>{translations.descriptionLabel}</FormLabel>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.imageLabel}</FormLabel>
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
          {saving ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            translations.saveButton
          )}
        </Button>
      </form>
    </Form>
  )
}

export default FormAdd
