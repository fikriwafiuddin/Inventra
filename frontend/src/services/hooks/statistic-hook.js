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
