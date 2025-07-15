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
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import productValidation from "@/lib/validations/product-validation"
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

function FormProduct() {
  const form = useForm({ resolver: zodResolver(productValidation.addProduct) })
  const [previewImg, setPreviewImg] = useState(null)

  const onSubmit = () => {}

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImg(imageUrl)
      form.setValue("image", file)
    }
  }
  return (
    <SheetContent side="top">
      <SheetHeader>
        <SheetTitle>Add Product</SheetTitle>
      </SheetHeader>
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
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem value={category._id}>
                            {category.label}
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
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
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
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mr-4">
            Save
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </form>
      </Form>
    </SheetContent>
  )
}

export default FormProduct
