"use client"

import { Checkbox } from "@/components/ui/checkbox"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { EditIcon, EyeIcon, Loader2Icon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import FormCategory from "./FormCategory"
import { useRemoveCategory } from "@/services/hooks/category-hook"
import { formatDate } from "@/lib/formatters"

const columnCategories = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const handleDelete = () => {
        mutate(row.original._id)
      }
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
              <FormCategory category={row.original} />
            </Sheet>
            <DropdownMenuItem asChild>
              <Link href={`products/${row.getValue("name")}`}>
                <EyeIcon /> Detail
              </Link>
            </DropdownMenuItem>

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
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default columnCategories
