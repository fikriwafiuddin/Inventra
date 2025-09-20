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

const columnSuppliers = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.getValue("address"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      if (status == "active") {
        return <Badge variant="success">{status}</Badge>
      } else {
        return <Badge variant="destructive">{status}</Badge>
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const supplier = row.original
      const { isPending: updating, mutate: update } = useUpdateStatusSupplier()
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
                  <EditIcon /> Edit
                </DropdownMenuItem>
              </SheetTrigger>
              <FormSupplier supplier={supplier} />
            </Sheet>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <TrashIcon /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Delete supplier {supplier.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      onClick={() => remove(supplier._id)}
                      disabled={deleting || updating}
                    >
                      {deleting ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        "Delete"
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
                      <RefreshCwOffIcon /> Inactive
                    </>
                  ) : (
                    <>
                      <RefreshCwIcon /> Active
                    </>
                  )}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Change supplier status
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      disabled={updating || deleting}
                      type="button"
                      onClick={
                        supplier.status === "active"
                          ? () =>
                              update({ id: supplier._id, status: "inactive" })
                          : () => update({ id: supplier._id, status: "active" })
                      }
                    >
                      {updating ? <Loader2Icon /> : "Change"}
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

export default columnSuppliers
