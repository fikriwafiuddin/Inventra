"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Details from "./Details"
import Counting from "./Counting"
import { useParams } from "next/navigation"
import { useGetDetailOpname } from "@/services/hooks/opname-hook"
import { Loader2Icon } from "lucide-react"

function DetailOpnamePage() {
  const { id } = useParams()
  const { isPending: fetching, data: opname, error } = useGetDetailOpname(id)

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock/opname">Opname</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {error && (
        <div className="text-destructive text-center mt-4">
          {error.response?.data.message ||
            error.message ||
            "An error occurred while fetching categories."}
        </div>
      )}

      {fetching && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
        </div>
      )}

      {opname &&
        (opname.status === "completed" ? (
          <Details opname={opname} />
        ) : (
          <Counting opname={opname} />
        ))}
    </div>
  )
}

export default DetailOpnamePage
