import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import analysisApi from "../api/ananlysis-api"

export const useAnalysisSales = (timePeriod) => {
  const { getToken } = useAuth()
  const request = { timePeriod }

  return useQuery({
    queryKey: ["analysis-sales", timePeriod],
    queryFn: async () => {
      const token = await getToken()
      return analysisApi.sales(request, token)
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useAnalysisPurchases = (timePeriod) => {
  const { getToken } = useAuth()
  const request = { timePeriod }

  return useQuery({
    queryKey: ["analysis-purchases", timePeriod],
    queryFn: async () => {
      const token = await getToken()
      return analysisApi.purchases(request, token)
    },
    staleTime: 1000 * 60 * 5,
  })
}
