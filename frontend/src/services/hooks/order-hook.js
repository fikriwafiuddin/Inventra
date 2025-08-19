import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "../api/order-api"
import { toast } from "sonner"

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

export const useGetAllOrders = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = await getToken()
      return await orderApi.getAll(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}
