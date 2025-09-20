"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormTab from "./FormTab"
import HistoryTab from "./HistoryTab"

function PurchasesPage() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="form">
        <TabsList>
          <TabsTrigger value="form">New Wholesale Input</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <FormTab />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PurchasesPage
