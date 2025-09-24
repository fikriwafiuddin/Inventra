"use client"

import categoryValidation from "@/lib/validations/category-validation"
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
import {
  useAddCategory,
  useRemoveCategory,
  useUpdateCategory,
} from "@/services/hooks/category-hook"
import { Loader2Icon } from "lucide-react"

function FormCategory({ translations, category }) {
  const form = useForm({
    resolver: zodResolver(categoryValidation.addCategory),
    defaultValues: {
      name: category?.name || "",
    },
  })
  const { mutate, isPending } = useAddCategory()
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateCategory()

  const onSubmit = (data) => {
    if (category) {
      updateMutate({ id: category._id, name: data.name })
    } else {
      mutate(data)
    }
  }
  return (
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>
          {category ? translations.titleEdit : translations.titleAdd}
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
                  <Input
                    placeholder={translations.placeholderName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending || isUpdatePending}
            type="submit"
            className="mr-4"
          >
            {isPending || isUpdatePending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              translations.buttonSave
            )}
          </Button>
          <SheetClose asChild>
            <Button disabled={isPending || isUpdatePending} variant="outline">
              {translations.buttonCancel}
            </Button>
          </SheetClose>
        </form>
      </Form>
    </SheetContent>
  )
}

export default FormCategory
