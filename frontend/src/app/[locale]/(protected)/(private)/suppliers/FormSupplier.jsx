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
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import {
  useAddSupplier,
  useUpdateSupplier,
} from "@/services/hooks/supplier-hook"
import { Loader2Icon } from "lucide-react"
import supplierValidation from "@/lib/validations/supplier-validations"

function FormSupplier({ translations, supplier }) {
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

  const onSubmit = (data) => {
    if (supplier) {
      update({ id: supplier?._id, data })
    } else {
      add(data)
    }
  }
  return (
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>
          {supplier ? translations.titleEdit : translations.titleAdd}
        </SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.labelName}</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>{translations.labelPhone}</FormLabel>
                <FormControl>
                  <Input type="phone" {...field} />
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
                <FormLabel>{translations.labelEmail}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>{translations.labelAddress}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={adding || updating} type="submit" className="mr-4">
            {adding || updating ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              translations.buttonSave
            )}
          </Button>
          <SheetClose asChild>
            <Button disabled={adding || updating} variant="outline">
              {translations.buttonClose}
            </Button>
          </SheetClose>
        </form>
      </Form>
    </SheetContent>
  )
}

export default FormSupplier
