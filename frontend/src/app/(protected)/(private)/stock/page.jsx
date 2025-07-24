import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdjustmentsTab from "./AdjustmentsTab"

function StockPage() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="adjustments">
        <TabsList>
          <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="adjustments">
          <AdjustmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StockPage
