"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import {
  useAddSupplier,
  useUpdateSupplier,
} from "@/services/hooks/supplier-hook"
import { Loader2Icon } from "lucide-react"
import supplierValidation from "@/lib/validations/supplier-validations"
import { useState } from "react"
import { SelectTrigger } from "@/components/ui/select"

function FormSupplier({ supplier, children }) {
  const form = useForm({
    resolver: zodResolver(supplierValidation.addSupplier),
    defaultValues: {
      name: supplier?.name || "",
      phone: supplier?.phone || "",
      email: supplier?.email || "",
      address: supplier?.address || "",
      status: supplier?.status || "",
    },
  })
  const { isPending: adding, mutate: add } = useAddSupplier()
  const { isPending: updating, mutate: update } = useUpdateSupplier()
  const [isOpenForm, setIsOpenForm] = useState(false)

  const onSubmit = (data) => {
    if (supplier) {
      update(
        { id: supplier?._id, data },
        {
          onSuccess: () => setIsOpenForm(false),
        }
      )
    } else {
      add(data, {
        onSuccess: () => setIsOpenForm(false),
      })
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{supplier ? "Edit" : "Add"} Supplier</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 px-4"
          >
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="phone" type="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={adding || updating}
              type="submit"
              className="mr-4"
            >
              {adding || updating ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
            <SheetClose asChild>
              <Button disabled={adding || updating} variant="outline">
                Close
              </Button>
            </SheetClose>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default FormSupplier
