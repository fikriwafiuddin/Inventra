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
