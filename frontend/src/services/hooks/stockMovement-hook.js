import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import stockMovementApi from "../api/stockMovement-api"

export const useGetAllStockMovements = (start, end, type) => {
  const { getToken } = useAuth()
  const request = { start, end, type }

  return useQuery({
    queryKey: ["stock-movements", start, end, type],
    queryFn: async () => {
      const token = await getToken()
      return await stockMovementApi.getAll(request, token)
    },
    staleTime: 5 * 6 * 1000,
  })
}
