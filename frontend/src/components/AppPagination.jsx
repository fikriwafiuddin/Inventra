import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function AppPagination({
  currentPage,
  totalPages,
  pageSize,
  totalData,
  onPageChange,
}) {
  // hitung start & end index data yang ditampilkan
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalData)

  // generate list halaman sederhana
  const generatePages = () => {
    const pages = []

    // tampilkan max 5 page di tengah
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
      {/* Info jumlah data */}
      <div className="flex items-center text-sm font-medium">
        <span>Showing</span>
        <span className="font-medium mx-1">{start}</span>
        <span>to</span>
        <span className="font-medium mx-1">{end}</span>
        <span>of</span>
        <span className="font-medium mx-1">{totalData}</span>
        <span>results</span>
      </div>

      {/* Navigasi halaman */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
            />
          </PaginationItem>

          {generatePages().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default AppPagination
