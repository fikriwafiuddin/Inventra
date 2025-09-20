import { Card, CardContent } from "@/components/ui/card"
import { AlertCircleIcon } from "lucide-react"

function HelpText() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertCircleIcon className="h-5 w-5 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Cara Menggunakan:</p>
            <ul className="text-sm space-y-1">
              <li>1. Masukkan Order Id dan klik "Cari Transaksi"</li>
              <li>3. Pilih item yang akan diretur dan tentukan kondisinya</li>
              <li>4. Klik "Proses Retur" untuk menyelesaikan</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HelpText
