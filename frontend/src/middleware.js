import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import createIntlMiddleware from "next-intl/middleware"

const intlMiddleware = createIntlMiddleware({
  locales: ["id", "en"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": {
      id: "/dasbor",
      en: "/dashboard",
    },
    "/products": {
      id: "/produk",
      en: "/products",
    },
    "/products/[sku]": {
      id: "/produk/[sku]",
      en: "/products/[sku]",
    },
    "/categories": {
      id: "/kategori",
      en: "/categories",
    },
    "/suppliers": {
      id: "/pemasok",
      en: "/suppliers",
    },
    "/stock": {
      id: "/stok",
      en: "/stock",
    },
    "/stock/adjustment": {
      id: "/stok/pencocokan",
      en: "/stock/adjustment",
    },
    "/stock/alert": {
      id: "/stok/peringatan",
      en: "/stock/alert",
    },
    "/stock/customer-returns": {
      id: "/stock/retur-pelanggan",
      en: "/stock/customer-returns",
    },
    "/stock/history": {
      id: "/stok/riwayat",
      en: "/stock/history",
    },
    "/stock/opname": {
      id: "/stok/opname",
      en: "/stock/opname",
    },
    "/stock/opname/[id]": {
      id: "/stok/opname/[id]",
      en: "/stock/opname/[id]",
    },
    "/stock/supplier-returns": {
      id: "/stok/pengembalian-pemasok",
      en: "/stock/supplier-returns",
    },
    "/pos": "/pos",
    "/orders": {
      id: "/pesanan",
      en: "/orders",
    },
    "/purchases": {
      id: "/pembelian",
      en: "/purchases",
    },
    "/purchases/[invoice]": {
      id: "/pembelian/[invoice]",
      en: "/purchases/[invoice]",
    },
    "/analysis": {
      id: "/analisis",
      en: "/analysis",
    },
    "/settings": {
      id: "/pengaturan",
      en: "/settings",
    },
  },
})

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/categories(.*)",
  "/orders(.*)",
  "/pos(.*)",
  "/products(.*)",
  "/purchases(.*)",
  "/settings(.*)",
  "/stock(.*)",
  "/suppliers(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  const intlResponse = intlMiddleware(req)

  if (intlResponse && intlResponse.status !== 200) {
    return intlResponse
  }

  return intlResponse
})

export const config = {
  matcher: [
    "/",
    "/(en|id)/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
