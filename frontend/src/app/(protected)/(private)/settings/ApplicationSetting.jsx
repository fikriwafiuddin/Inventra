import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SaveIcon, Settings } from "lucide-react"
import { useState } from "react"

const currencies = [
  { id: "IDR", label: "Rupiah (IDR)" },
  {
    id: "USD",
    label: "US Dollar (USD)",
  },
  {
    id: "EUR",
    label: "Euro (EUR)",
  },
]

const languages = [
  {
    id: "id",
    label: "Bahasa Indonesia",
  },
  {
    id: "en",
    label: "English",
  },
]

function ApplicationSetting() {
  const selectedCurrency = localStorage.getItem("currency")
  const selectedLanguage = localStorage.getItem("language")
  const [language, setLanguage] = useState(selectedLanguage || "en")
  const [currency, setCurrency] = useState(selectedCurrency || "USD")

  const handleSubmit = () => {
    localStorage.setItem("currency", currency)
    localStorage.setItem("language", language)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Application Settings</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your application preferences and display settings.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Currency</Label>
            <Select onValueChange={setCurrency} value={currency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your preferred currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.id} value={currency.id}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Display Language</Label>
            <Select onValueChange={setLanguage} value={language}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your preferred language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem value={language.id} key={language.id}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-[120px]">
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  )
}

export default ApplicationSetting
