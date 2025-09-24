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

const createColumnCategories = (translations) => {
  return [
    {
      accessorKey: "name",
      header: translations.tableHead.name,
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "createdAt",
      header: translations.tableHead.createdAt,
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
      accessorKey: "updatedAt",
      header: translations.tableHead.updatedAt,
      cell: ({ row }) => formatDate(row.getValue("updatedAt")),
    },
    {
      id: "actions",
      header: translations.tableHead.actions,
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
                    <EditIcon /> {translations.buttonActions.edit}
                  </DropdownMenuItem>
                </SheetTrigger>
                <FormCategory
                  category={row.original}
                  translations={translations.formCategory}
                />
              </Sheet>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <TrashIcon /> {translations.buttonActions.delete}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {translations.confirmDelete.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {translations.confirmDelete.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {translations.confirmDelete.cancelButton}
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          translations.buttonActions.delete
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

export default createColumnCategories
