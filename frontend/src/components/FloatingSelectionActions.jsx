import { DownloadIcon, EditIcon, Trash2Icon, XIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FloatingSelectionActions = ({ selectedCount, onClear, onBulkAction }) => {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <Card className="">
        <CardContent className="p-4 space-y-2 relative">
          {/* Clear selection */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="flex items-center absolute top-0 right-2 space-x-1 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="h-4 w-4" />
          </Button>
          {/* Selected count */}
          <Badge variant="secondary" className="text-sm font-medium">
            {selectedCount} selected
          </Badge>
          <div className="flex items-center space-x-4">
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                // onClick={() => onBulkAction("export")}
                className="flex items-center space-x-1"
              >
                <DownloadIcon className="h-4 w-4" />
                <span>Export</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                // onClick={() => onBulkAction("edit")}
                className="flex items-center space-x-1"
              >
                <EditIcon className="h-4 w-4" />
                <span>Edit</span>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <Trash2Icon className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your data and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FloatingSelectionActions
