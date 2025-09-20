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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/formatters"
import { useRemoveProduct } from "@/services/hooks/product-hook"
import {
  ArrowUpDown,
  EditIcon,
  EyeIcon,
  Loader2Icon,
  TrashIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const columnProducts = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const image = row.getValue("image")

      return (
        <div className="relative size-7 p-0.5 bg-accent-foreground rounded-sm overflow-hidden">
          <Image
            src={image.url}
            alt={row.getValue("name")}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => <span className="text-sm">{row.getValue("sku")}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="lowercase">{row.getValue("name")}</span>
        <span className="text-sm text-muted-foreground">
          {row.original.category.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatCurrency(row.getValue("price")),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock")
      const minStock = row.getValue("minStock")

      if (stock === 0) {
        return <Badge variant="destructive">{stock}</Badge>
      }
      if (stock < minStock) {
        return <Badge variant="warning">{stock}</Badge>
      }
      return <Badge variant="outline">{stock}</Badge>
    },
  },
  {
    accessorKey: "minStock",
    header: "Min Stock",
    cell: ({ row }) => row.getValue("minStock"),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => row.getValue("sold"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { isPending, mutate: removeProduct } = useRemoveProduct()
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem asChild>
              <Link href={`products/update/${row.getValue("sku")}`}>
                <EditIcon /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`products/${row.getValue("sku")}`}>
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
                    your product and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      onClick={() => removeProduct(product._id)}
                      type="button"
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

export default columnProducts
