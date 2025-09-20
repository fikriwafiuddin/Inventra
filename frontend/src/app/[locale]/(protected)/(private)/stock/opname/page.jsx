"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, CheckCircle, Loader2Icon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import History from "./History"

const StockOpnamePage = () => {
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
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Opname</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Stock Opname</h1>
          <p className="text-muted-foreground">
            Kelola sesi stock opname dan penghitungan stok fisik
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Mulai Sesi Stock Opname Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mulai Sesi Stock Opname Baru</DialogTitle>
              <DialogDescription>
                Buat sesi stock opname baru untuk memulai penghitungan fisik
                stok
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel>Nama Sesi</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Contoh: Stock Opname Akhir Tahun 2025"
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
                        Mulai Sekarang
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <History />
    </div>
  )
}

export default StockOpnamePage
