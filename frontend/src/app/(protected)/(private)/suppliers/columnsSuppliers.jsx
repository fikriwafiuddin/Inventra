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
import { useState } from "react"

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
      const [isConfirmDelete, setIsConfirmDelete] = useState(false)
      const [isConfirmChangeStatus, setIsChangeStatus] = useState(false)

      const handleRemoveSupplier = () => {
        remove(supplier._id, {
          onSuccess: () => setIsConfirmDelete(false),
        })
      }

      const handleChangeStatusSupplier = () => {
        update(
          {
            id: supplier._id,
            status: supplier.status === "active" ? "inactive" : "active",
          },
          {
            onSuccess: () => setIsChangeStatus(false),
          }
        )
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <FormSupplier supplier={supplier}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EditIcon /> Edit
                </DropdownMenuItem>
              </FormSupplier>

              <DropdownMenuItem onClick={() => setIsConfirmDelete(true)}>
                <TrashIcon /> Delete
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setIsChangeStatus(true)}>
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
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isConfirmDelete} onOpenChange={setIsConfirmDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete supplier {supplier.name}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={handleRemoveSupplier}
                  disabled={deleting || updating}
                >
                  {deleting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={isConfirmChangeStatus}
            onOpenChange={setIsChangeStatus}
          >
            <AlertDialogTrigger asChild></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Change supplier status
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={updating || deleting}
                  type="button"
                  onClick={handleChangeStatusSupplier}
                >
                  {updating ? <Loader2Icon /> : "Change"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]

export default columnSuppliers
