import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { EyeIcon, Loader2Icon, PrinterIcon } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { formatCurrency, formatDate } from "@/lib/formatters"

const ReceiptModal = ({ orderData }) => {
  const receiptRef = useRef()
  const { user, isLoaded } = useUser()

  if (!orderData) {
    return null
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  const handlePrint = () => {
    const printContent = receiptRef.current
    const originalContents = document.body.innerHTML
    const printWindow = window.open("", "", "height=600,width=800")

    if (printWindow) {
      printWindow.document.write("<html><head><title>Struk Pesanan</title>")
      printWindow.document.write("<style>")
      printWindow.document.write(`
        body { font-family: sans-serif; margin: 20px; }
        .receipt-container { width: 100%; max-width: 300px; margin: 0 auto; padding: 10px; border: 1px dashed #ccc; font-size: 0.8em; }
        .header, .footer { text-align: center; margin-bottom: 10px; }
        .header h3 { margin: 0; font-size: 1.2em; }
        .item-list table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .item-list th, .item-list td { padding: 5px 0; text-align: left; border-bottom: 1px dashed #eee; }
        .item-list th:nth-child(2), .item-list td:nth-child(2) { text-align: right; }
        .item-list th:nth-child(3), .item-list td:nth-child(3) { text-align: right; }
        .total-section { margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px; }
        .total-row { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px; }
      `)
      printWindow.document.write("</style>")
      printWindow.document.write("</head><body>")
      printWindow.document.write(printContent.innerHTML)
      printWindow.document.write("</body></html>")
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    } else {
      alert(
        "Browser Anda memblokir pop-up. Mohon izinkan pop-up untuk mencetak struk."
      )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-h-[90vh] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Struk Pesanan</DialogTitle>
          <DialogDescription>
            Berikut adalah detail pesanan yang baru saja berhasil.
          </DialogDescription>
        </DialogHeader>

        <div
          ref={receiptRef}
          className="flex-grow overflow-y-auto p-4 border border-dashed print:border-none print:p-0"
        >
          <div className="header mb-4 text-center">
            <h3 className="text-xl font-bold">
              {user?.unsafeMetadata?.businessName || "-"}
            </h3>
            <p className="text-sm">{user?.unsafeMetadata?.address || "-"}</p>
            <p className="text-sm">{user?.unsafeMetadata?.phone || "-"}</p>
          </div>

          <div className="info mb-4 text-sm">
            <p>
              <strong>ID Pesanan:</strong> {orderData.orderId}
            </p>
            <p>
              <strong>Tanggal:</strong> {formatDate(orderData.date)}
            </p>
          </div>

          <div className="item-list mb-4">
            <h4 className="font-semibold mb-2">Item:</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dashed border-gray-300">
                  <th className="py-1 text-left">Nama</th>
                  <th className="py-1 text-right">Qty</th>
                  <th className="py-1 text-right">Harga</th>
                  <th className="py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dotted border-gray-200 last:border-b-0"
                  >
                    <td className="py-1">{item.name}</td>
                    <td className="py-1 text-right">{item.quantity}</td>
                    <td className="py-1 text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-1 text-right">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total-section pt-2 border-t border-dashed border-gray-300">
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total Pembayaran:</span>
              <span>{formatCurrency(orderData.amount)}</span>
            </div>
          </div>

          <div className="footer mt-4 text-center text-xs">
            <p>Terima kasih telah berbelanja!</p>
            <p>
              Barang yang sudah dibeli tidak dapat dikembalikan kecuali ada
              kesepakatan.
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between mt-4 no-print">
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
          <Button onClick={handlePrint}>
            <PrinterIcon /> Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptModal
