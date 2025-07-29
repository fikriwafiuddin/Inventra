"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, CheckCircle, Package } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import columns from "./columns"
import opnames from "@/data/opname-data"
import { DataTable } from "@/components/DataTable"
import { useState } from "react"

const StockOpnamePage = () => {
  const [newSessionName, setNewSessionName] = useState("")

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/stock">Stock</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Opname</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stock Opname</h1>
          <p className="text-muted-foreground">
            Kelola sesi stock opname dan penghitungan stok fisik
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Mulai Sesi Stock Opname Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mulai Sesi Stock Opname Baru</DialogTitle>
              <DialogDescription>
                Buat sesi stock opname baru untuk memulai penghitungan fisik
                stok
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="session-name">Nama Sesi</Label>
                <Input
                  id="session-name"
                  placeholder="Contoh: Stock Opname Akhir Tahun 2025"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                />
              </div>
              <Button
                // onClick={startNewSession}
                disabled={!newSessionName.trim()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mulai Sekarang
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Daftar Sesi Stock Opname
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={opnames} />
        </CardContent>
      </Card>
    </div>
  )
}

export default StockOpnamePage
