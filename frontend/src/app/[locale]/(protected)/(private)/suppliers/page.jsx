import Stats from "./Stats"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import FormSupplier from "./FormSupplier"
import SuppliersTable from "./SuppliersTable"
import { useTranslations } from "next-intl"

const suppliers = [
  {
    id: "1",
    name: "TechnoSupply Corp",
    contactName: "John Smith",
    email: "john@technosupply.com",
    phone: "+1-555-0123",
    address: "123 Business St",
    city: "New York",
    country: "United States",
    taxId: "US123456789",
    paymentTerms: "Net 30",
    status: "active",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "Global Materials Ltd",
    contactName: "Sarah Johnson",
    email: "sarah@globalmaterials.com",
    phone: "+44-20-7946-0958",
    address: "456 Industrial Ave",
    city: "London",
    country: "United Kingdom",
    taxId: "GB987654321",
    paymentTerms: "Net 15",
    status: "active",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
  },
  {
    id: "3",
    name: "Premium Parts Inc",
    contactName: "Michael Chen",
    email: "michael@premiumparts.com",
    phone: "+1-555-0187",
    address: "789 Commerce Blvd",
    city: "Los Angeles",
    country: "United States",
    taxId: "US555777999",
    paymentTerms: "Net 45",
    status: "inactive",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-25T08:20:00Z",
  },
  {
    id: "4",
    name: "Euro Components",
    contactName: "Anna Mueller",
    email: "anna@eurocomponents.de",
    phone: "+49-30-12345678",
    address: "321 Industrie Str",
    city: "Berlin",
    country: "Germany",
    taxId: "DE111222333",
    paymentTerms: "Net 30",
    status: "active",
    createdAt: "2024-01-08T12:00:00Z",
    updatedAt: "2024-01-18T15:30:00Z",
  },
  {
    id: "5",
    name: "Pacific Suppliers",
    contactName: "Hiroshi Tanaka",
    email: "hiroshi@pacificsuppliers.jp",
    phone: "+81-3-1234-5678",
    address: "654 Business District",
    city: "Tokyo",
    country: "Japan",
    taxId: "JP444555666",
    paymentTerms: "Net 60",
    status: "active",
    createdAt: "2024-01-12T10:15:00Z",
    updatedAt: "2024-01-22T13:45:00Z",
  },
]

function SuppliersPage() {
  const t = useTranslations("SuppliersPage")

  const formTranslations = {
    titleAdd: t("formSupplier.titleAdd"),
    titleEdit: t("formSupplier.titleEdit"),
    labelName: t("formSupplier.labelName"),
    labelPhone: t("formSupplier.labelPhone"),
    labelEmail: t("formSupplier.labelEmail"),
    labelAddress: t("formSupplier.labelAddress"),
    buttonSave: t("formSupplier.buttonSave"),
    buttonSave: t("formSupplier.buttonSave"),
  }
  const translations = {
    stats: {
      totalSuppliers: t("stats.totalSuppliers"),
      activeSuppliers: t("stats.activeSuppliers"),
      inactiveSuppliers: t("stats.inactiveSuppliers"),
    },
    addButton: t("addButton"),
    suppliersTable: {
      placeholderSearch: t("suppliersTable.placeholderSearch"),
      allStatus: t("suppliersTable.allStatus"),
      statusLabel: t("suppliersTable.statusLabel"),
      status: {
        active: t("suppliersTable.status.active"),
        inactive: t("suppliersTable.status.inactive"),
      },
      tableHead: {
        name: t("suppliersTable.tableHead.name"),
        email: t("suppliersTable.tableHead.email"),
        phone: t("suppliersTable.tableHead.phone"),
        address: t("suppliersTable.tableHead.address"),
        status: t("suppliersTable.tableHead.status"),
        createdAt: t("suppliersTable.tableHead.createdAt"),
        actions: t("suppliersTable.tableHead.actions"),
      },
      actionsButton: {
        edit: t("suppliersTable.actionsButton.edit"),
        delete: t("suppliersTable.actionsButton.delete"),
      },
      confirmDelete: {
        title: t("suppliersTable.confirmDelete.title"),
        description: t("suppliersTable.confirmDelete.description"),
        cancelButton: t("suppliersTable.confirmDelete.cancelButton"),
        confirmButton: t("suppliersTable.confirmDelete.confirmButton"),
      },
      confirmChange: {
        title: t("suppliersTable.confirmChange.title"),
        description: t("suppliersTable.confirmChange.description"),
        cancelButton: t("suppliersTable.confirmChange.cancelButton"),
        changeButton: t("suppliersTable.confirmChange.changeButton"),
      },
      formSupplier: formTranslations,
    },
  }

  return (
    <div className="space-y-4">
      <Stats translations={translations.stats} />

      {/* ADD PRODUCT */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mb-2">+ {translations.addButton}</Button>
        </SheetTrigger>
        <FormSupplier translations={formTranslations} />
      </Sheet>

      <SuppliersTable translations={translations.suppliersTable} />
    </div>
  )
}

export default SuppliersPage
