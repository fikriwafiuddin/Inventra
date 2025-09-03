import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { CircleXIcon, Loader2Icon, PrinterIcon } from "lucide-react"

// Ini adalah tipe untuk data order Anda, sesuaikan jika ada perbedaan
// Jika Anda menggunakan TypeScript, ini akan sangat membantu
// type OrderItem = {
//   id: string;
//   name: string;
//   sku: string;
//   quantity: number;
//   price: number;
// };

// type Order = {
//   orderId: string;
//   amount: number;
//   date: Date;
//   items: OrderItem[];
// };

const sampleOrder = {
  orderId: "ORD-2024-001",
  amount: 125000,
  date: new Date(),
  items: [
    {
      id: "1",
      name: "Kopi Arabica Premium",
      sku: "KAP-001",
      quantity: 2,
      price: 35000,
    },
    {
      id: "2",
      name: "Roti Croissant",
      sku: "RC-002",
      quantity: 3,
      price: 18000,
    },
    {
      id: "3",
      name: "Es Teh Manis",
      sku: "ETM-003",
      quantity: 1,
      price: 7000,
    },
    {
      id: "3",
      name: "Es Teh Manis",
      sku: "ETM-003",
      quantity: 1,
      price: 7000,
    },
    {
      id: "3",
      name: "Es Teh Manis",
      sku: "ETM-003",
      quantity: 1,
      price: 7000,
    },
    {
      id: "3",
      name: "Es Teh Manis",
      sku: "ETM-003",
      quantity: 1,
      price: 7000,
    },
  ],
}

const ReceiptModal = ({ isOpen, onClose, orderData }) => {
  const receiptRef = useRef()

  if (!orderData) {
    return null // Jangan render modal jika tidak ada data
  }

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  // Fungsi untuk memformat mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount)
  }

  const handlePrint = () => {
    const printContent = receiptRef.current
    const originalContents = document.body.innerHTML
    const printWindow = window.open("", "", "height=600,width=800")

    if (printWindow) {
      printWindow.document.write("<html><head><title>Struk Pesanan</title>")
      // Anda bisa menambahkan styling CSS kustom untuk print di sini jika diperlukan
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* PENTING: Tambahkan `className="flex flex-col h-[90vh]"` pada DialogContent */}
      <DialogContent className="flex flex-col max-h-[90vh] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Struk Pesanan</DialogTitle>
          <DialogDescription>
            Berikut adalah detail pesanan yang baru saja berhasil.
          </DialogDescription>
        </DialogHeader>

        {/* Konten Struk yang Akan Dicetak - Tambahkan `flex-grow overflow-y-auto` di sini */}
        <div
          ref={receiptRef}
          className="flex-grow overflow-y-auto p-4 border border-dashed print:border-none print:p-0"
        >
          <div className="header mb-4 text-center">
            <h3 className="text-xl font-bold">Nama Toko Anda</h3>
            <p className="text-sm">Jl. Contoh No. 123, Kota Anda</p>
            <p className="text-sm">Telp: (021) 12345678</p>
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

        {/* DialogFooter tidak perlu diubah, karena sudah fixed di bawah */}
        <DialogFooter className="flex justify-between sm:justify-between mt-4 no-print">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button onClick={handlePrint}>
            <PrinterIcon /> Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptModal
