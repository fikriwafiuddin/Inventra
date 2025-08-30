"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormSupplierReturn from "./FormSupplierReturn"
import History from "./History"

const SupplierReturnPage = () => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Supplier Returns</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="return" className="">
        <TabsList>
          <TabsTrigger value="return">Return</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="return">
          <FormSupplierReturn />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SupplierReturnPage
