import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function AppPagination() {
  return (
    <div class="px-6 py-4 flex items-center justify-between">
      <div class="flex items-center text-sm font-medium">
        <span>Showing</span>
        <span class="font-medium mx-1">1</span>
        <span>to</span>
        <span class="font-medium mx-1">10</span>
        <span>of</span>
        <span class="font-medium mx-1">1,245</span>
        <span>results</span>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default AppPagination
