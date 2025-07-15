import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/formatters"
import { ArrowUpDown, EditIcon, EyeIcon, TrashIcon } from "lucide-react"
import Image from "next/image"

const columnProducts = [
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
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const image = row.getValue("image")

      return (
        <div className="relative size-7 p-0.5 bg-accent-foreground rounded-sm overflow-hidden">
          <Image
            src={image}
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
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

      if (stock >= 5) {
        return <Badge variant="outline">{stock}</Badge>
      }
      return <Badge variant="destructive">{stock}</Badge>
    },
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="top">
                <EditIcon /> Edit
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                <EyeIcon /> Detail
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                <TrashIcon /> Delete
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default columnProducts
