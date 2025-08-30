import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "../api/order-api"
import { toast } from "sonner"
import useDebounce from "@/hooks/useDebounce"

export const useAddOrder = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await orderApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the product."
      )
      console.error(error)
    },
  })
}

export const useGetAllOrders = (start, end, search) => {
  const { getToken } = useAuth()
  const debouncedSearch = useDebounce(search, 500)
  const request = { start, end, search: debouncedSearch }

  return useQuery({
    queryKey: ["orders", start, end, debouncedSearch],
    queryFn: async () => {
      const token = await getToken()
      return await orderApi.getAll(request, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetDetailOrder = (orderId) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const token = await getToken()
      return await orderApi.detail(orderId, token)
    },
    staleTime: 5 * 60 * 1000,
    enabled: false,
  })
}
