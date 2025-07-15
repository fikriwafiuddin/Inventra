const { DownloadIcon, EditIcon, Trash2Icon, XIcon } = require("lucide-react")
const { Badge } = require("./ui/badge")
const { Button } = require("./ui/button")
const { Card, CardContent } = require("./ui/card")

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

              <Button
                variant="destructive"
                size="sm"
                // onClick={() => onBulkAction("delete")}
                className="flex items-center space-x-1"
              >
                <Trash2Icon className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FloatingSelectionActions
