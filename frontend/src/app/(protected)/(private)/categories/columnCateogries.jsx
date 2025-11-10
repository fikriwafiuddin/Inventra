"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { EditIcon, EyeIcon, Loader2Icon, TrashIcon } from "lucide-react"
import Link from "next/link"
import FormCategory from "./FormCategory"
import { useRemoveCategory } from "@/services/hooks/category-hook"
import { formatDate } from "@/lib/formatters"
import { useState } from "react"

const columnCategories = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => formatDate(row.getValue("updatedAt")),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate, isPending } = useRemoveCategory()
      const [isConfirmDelete, setIsConfirmDelete] = useState(false)
      const handleDelete = () => {
        mutate(row.original._id, {
          onSuccess: () => setIsConfirmDelete(false),
        })
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
              <FormCategory category={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EditIcon /> Edit
                </DropdownMenuItem>
              </FormCategory>

              <DropdownMenuItem asChild>
                <Link href={`products/${row.getValue("name")}`}>
                  <EyeIcon /> Detail
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setIsConfirmDelete(true)}>
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isConfirmDelete} onOpenChange={setIsConfirmDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your category and product data and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]

export default columnCategories
