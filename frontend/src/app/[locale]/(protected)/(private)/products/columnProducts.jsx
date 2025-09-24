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

const createColumnProducts = (translations) => {
  return [
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
      header: translations.tableHead.sku,
      cell: ({ row }) => <span className="text-sm">{row.getValue("sku")}</span>,
    },
    {
      accessorKey: "name",
      header: translations.tableHead.name,
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
      header: translations.tableHead.price,
      cell: ({ row }) => formatCurrency(row.getValue("price")),
    },
    {
      accessorKey: "stock",
      header: translations.tableHead.stock,
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
      header: translations.tableHead.minStock,
      cell: ({ row }) => row.getValue("minStock"),
    },
    {
      accessorKey: "sold",
      header: translations.tableHead.sold,
      cell: ({ row }) => row.getValue("sold"),
    },
    {
      id: "actions",
      header: translations.tableHead.actions,
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
                  <EditIcon /> {translations.buttonActions.edit}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`products/${row.getValue("sku")}`}>
                  <EyeIcon /> {translations.buttonActions.edit}
                </Link>
              </DropdownMenuItem>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <TrashIcon /> {translations.buttonActions.delete}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
}

export default createColumnProducts
