import { Card, CardContent } from "@/components/ui/card"
import { AlertCircleIcon } from "lucide-react"

function HelpText({ translations }) {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertCircleIcon className="h-5 w-5 mt-0.5" />
          <div>
            <p className="font-medium mb-1">{translations.title}</p>
            <ul className="text-sm space-y-1">
              <li>{translations.step1}</li>
              <li>{translations.step2}</li>
              <li>{translations.step3}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HelpText
