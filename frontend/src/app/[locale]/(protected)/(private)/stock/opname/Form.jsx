"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import opnameValidation from "@/lib/validations/opname-validation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAddOpname } from "@/services/hooks/opname-hook"
import { useRouter } from "next/navigation"
import { CheckCircle, Loader2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function FormOpname({ translations }) {
  const form = useForm({
    resolver: zodResolver(opnameValidation.add),
    defaultValues: {
      name: "",
    },
  })
  const { isPending: adding, mutate: add } = useAddOpname()
  const router = useRouter()

  const onSubmit = (data) => {
    add(data, {
      onSuccess: (data) => router.push(`/stock/opname/${data.body.opname._id}`),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>{translations.nameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={translations.namePlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={adding}>
            {adding ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {translations.startButton}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormOpname
