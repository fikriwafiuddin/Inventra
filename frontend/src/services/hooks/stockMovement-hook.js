import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import stockMovementApi from "../api/stockMovement-api"

export const useGetAllStockMovements = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["stock-movements"],
    queryFn: async () => {
      const token = await getToken()
      return await stockMovementApi.getAll(token)
    },
    staleTime: 5 * 6 * 1000,
  })
}
