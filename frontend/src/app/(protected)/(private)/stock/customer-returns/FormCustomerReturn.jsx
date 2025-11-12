import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingCart,
  ArrowLeft,
  Check,
  FileText,
  Loader2Icon,
} from "lucide-react"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HelpText from "./HelpText"
import orderApi from "@/services/api/order-api"
import { useAuth } from "@clerk/nextjs"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { useAddCustomerReturn } from "@/services/hooks/customerReturn-hook"

function FormCustomerReturn() {
  const [searchValue, setSearchValue] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [returnItems, setReturnItems] = useState([])
  const [notes, setNotes] = useState("")
  const [searching, setSearching] = useState(false)
  const { getToken } = useAuth()
  const { mutate: save, isPending: saving } = useAddCustomerReturn()

  const handleSearch = async () => {
    try {
      setSearching(true)

      const token = await getToken()

      const data = await orderApi.detail(searchValue, token)
      setSelectedTransaction(data)
      const initialReturnItems = data.items.map((item) => ({
        ...item,
        returnQuantity: 0,
        condition: "",
        returnPrice: item.price,
        returnSubtotal: 0,
      }))
      setReturnItems(initialReturnItems)
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the product."
      )
    } finally {
      setSearching(false)
    }
  }

  const updateReturnItem = (itemId, field, value) => {
    setReturnItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate subtotal jika quantity atau price berubah
          if (field === "returnQuantity" || field === "returnPrice") {
            updatedItem.returnSubtotal =
              updatedItem.returnQuantity * updatedItem.returnPrice
          }

          return updatedItem
        }
        return item
      })
    )
  }

  const calculateTotalRefund = () => {
    return returnItems.reduce((total, item) => total + item.returnSubtotal, 0)
  }

  const getTotalReturnQuantity = () => {
    return returnItems.reduce((total, item) => total + item.returnQuantity, 0)
  }

  const handleSubmitReturn = () => {
    const items = returnItems
      .filter((item) => item.returnQuantity > 0)
      .map((item) => ({
        id: item.id,
        condition: item.condition,
        quantity: item.returnQuantity,
      }))

    const data = {
      orderId: selectedTransaction.orderId,
      items,
      notes,
      date: new Date(),
    }

    save(data)

    // Reset form
    setSelectedTransaction(null)
    setReturnItems([])
    setNotes("")
    setSearchValue("")
  }

  const isValidReturn = () => {
    return (
      getTotalReturnQuantity() > 0 &&
      returnItems
        .filter((item) => item.returnQuantity > 0)
        .every((item) => item.condition)
    )
  }
  return (
    <div className="space-y-4">
      {/* Search Transaction Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Sales Transaction Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="searchValue">Order Id</Label>
              <Input
                id="searchValue"
                placeholder="Enter order ID..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              disabled={searching || searchValue.trim().length < 3}
              onClick={handleSearch}
            >
              {searching ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Transactions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      {selectedTransaction && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Transaction Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2">Transaction Information</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Invoice:</span>{" "}
                    {selectedTransaction.orderId}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(selectedTransaction.date)}
                  </p>
                  <p>
                    <span className="font-medium">Total Transactions: </span>
                    {formatCurrency(selectedTransaction.amount)}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Statistics</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Number of Items:</span>{" "}
                    {selectedTransaction.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Total Unit:</span>{" "}
                    {selectedTransaction.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Items Form */}
      {selectedTransaction && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              List of Items for Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto border rounded-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty Purchased</TableHead>
                    <TableHead>Qty Return</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Return Price</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            SKU: {item.sku}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.quantity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={item.returnQuantity}
                          onChange={(e) =>
                            updateReturnItem(
                              item.id,
                              "returnQuantity",
                              Math.min(
                                parseInt(e.target.value) || 0,
                                item.quantity
                              )
                            )
                          }
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.condition}
                          onValueChange={(value) =>
                            updateReturnItem(item.id, "condition", value)
                          }
                          disabled={item.returnQuantity === 0}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Choose condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="good">Good/Saleable</SelectItem>
                            <SelectItem value="damaged">Damaged</SelectItem>
                            <SelectItem value="defective">Defective</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.returnPrice}
                          onChange={(e) =>
                            updateReturnItem(
                              item.id,
                              "returnPrice",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-32"
                          disabled={item.returnQuantity === 0}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Rp {item.returnSubtotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Summary */}
      {selectedTransaction && getTotalReturnQuantity() > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Return Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Total Return</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Total Items Returned:</span>{" "}
                      {getTotalReturnQuantity()} unit
                    </p>
                    <p className="text-lg font-bold">
                      Total Refund: Rp {calculateTotalRefund().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add a note regarding this return..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {selectedTransaction && (
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedTransaction(null)
              setReturnItems([])
              setNotes("")
              setSearchValue("")
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReturn}
            disabled={!isValidReturn() || saving}
            className="min-w-32"
          >
            {saving ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Return Process
              </>
            )}
          </Button>
        </div>
      )}

      {/* Help Text */}
      {!selectedTransaction && <HelpText />}
    </div>
  )
}

export default FormCustomerReturn
