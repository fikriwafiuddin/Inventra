"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { formatDate } from "@/lib/formatters"
import {
  EditIcon,
  Loader2Icon,
  RefreshCwIcon,
  RefreshCwOffIcon,
  TrashIcon,
} from "lucide-react"
import FormSupplier from "./FormSupplier"
import {
  useRemoveSupplier,
  useUpdateStatusSupplier,
} from "@/services/hooks/supplier-hook"

const createColumnSuppliers = (translations) => {
  return [
    {
      accessorKey: "name",
      header: translations.tableHead.name,
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "email",
      header: translations.tableHead.email,
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "phone",
      header: translations.tableHead.phone,
      cell: ({ row }) => row.getValue("phone"),
    },
    {
      accessorKey: "address",
      header: translations.tableHead.address,
      cell: ({ row }) => row.getValue("address"),
    },
    {
      accessorKey: "status",
      header: translations.tableHead.status,
      cell: ({ row }) => {
        const status = row.getValue("status")
        if (status == "active") {
          return <Badge variant="success">{translations.status.active}</Badge>
        } else {
          return (
            <Badge variant="destructive">{translations.status.inactive}</Badge>
          )
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: translations.tableHead.createdAt,
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
      accessorKey: "actions",
      header: translations.tableHead.actions,
      cell: ({ row }) => {
        const supplier = row.original
        const { isPending: updating, mutate: update } =
          useUpdateStatusSupplier()
        const { isPending: deleting, mutate: remove } = useRemoveSupplier()

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <EditIcon /> {translations.actionsButton.edit}
                  </DropdownMenuItem>
                </SheetTrigger>
                <FormSupplier
                  supplier={supplier}
                  translations={translations.formSupplier}
                />
              </Sheet>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <TrashIcon /> {translations.actionsButton.delete}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {translations.confirmDelete.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {translations.confirmDelete.description} {supplier.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {translations.confirmDelete.cancelButton}
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        onClick={() => remove(supplier._id)}
                        disabled={deleting || updating}
                      >
                        {deleting ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          translations.confirmDelete.confirmButton
                        )}
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {supplier.status === "active" ? (
                      <>
                        <RefreshCwOffIcon /> {translations.status.active}
                      </>
                    ) : (
                      <>
                        <RefreshCwIcon /> {translations.status.inactive}
                      </>
                    )}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {translations.confirmChange.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {translations.confirmChange.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {translations.confirmChange.cancelButton}
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        disabled={updating || deleting}
                        type="button"
                        onClick={
                          supplier.status === "active"
                            ? () =>
                                update({ id: supplier._id, status: "inactive" })
                            : () =>
                                update({ id: supplier._id, status: "active" })
                        }
                      >
                        {updating ? (
                          <Loader2Icon />
                        ) : (
                          translations.confirmChange.changeButton
                        )}
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export default createColumnSuppliers
