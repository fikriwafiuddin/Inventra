import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import statisticApi from "../api/statistic-api"

export const useGetStatisticProduct = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["statistic-product"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.product(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetStatisticSupplier = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["statistic-supplier"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.supplier(token)
    },
    staleTime: 5 * 60 * 100,
  })
}

export const useGetstockMovementSummary = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["stock-movement-summary"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.stockMovementSummary(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetStockSummary = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["stock-summary"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.stockSummary(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetDashboard = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.dashboard(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetWeeklyIncomeInMonth = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["weekly-income-month"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.weeklyIncomeInMonth(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetLatestOrders = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["latest-orders"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.latestOrders(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetTopProducts = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["top-products"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.topProducts(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetBottomProducts = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["bottom-products"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.bottomProducts(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetStockAlert = (page = 1, limit = 10) => {
  const { getToken } = useAuth()
  const request = { page, limit }

  return useQuery({
    queryKey: ["stock-alert", page, limit],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.stockAlert(request, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetLatestStockMovements = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["latest-stock-movements"],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.latestStockMovements(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetProductSalesStats = (sku) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["product-sales-stats", sku],
    queryFn: async () => {
      const token = await getToken()
      return await statisticApi.productSalesStats(sku, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}
