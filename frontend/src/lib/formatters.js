/**
 * Format a number as currency
 */
export const formatCurrency = (amount) => {
  if (typeof window === "undefined") return amount // cegah error SSR

  const supportedCurrencies = ["USD", "IDR"]
  const currency = localStorage.getItem("currency")

  const finalCurrency = supportedCurrencies.includes(currency)
    ? currency
    : "USD"

  // Tentukan locale sesuai currency
  const localeMap = {
    IDR: "id-ID", // Indonesia
    USD: "en-US", // Amerika
  }

  const locale = localeMap[finalCurrency] || "en-US"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: finalCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

/**
 * Get a color class based on order status
 */
export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
