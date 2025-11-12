import { Card, CardContent } from "@/components/ui/card"
import { AlertCircleIcon } from "lucide-react"

function HelpText() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertCircleIcon className="h-5 w-5 mt-0.5" />
          <div>
            <p className="font-medium mb-1">How to use:</p>
            <ul className="text-sm space-y-1">
              <li>1. Enter Order ID and click "Search Transaction"</li>
              <li>
                3. Select the item to be returned and determine its condition.
              </li>
              <li>4. Click "Process Return" to complete</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HelpText
