import opnames from "@/data/opname-data"

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

async function DetailOpnamePage({ params }) {
  const { id } = await params
  const opname = opnames.find((value) => value._id == id)

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock/opname">Opaname</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {opname.status === "completed" ? (
        <Details opname={opname} />
      ) : (
        <Counting opname={opname} />
      )}
    </div>
  )
}

export default DetailOpnamePage
