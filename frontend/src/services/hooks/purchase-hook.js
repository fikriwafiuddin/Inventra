import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import purchaseApi from "../api/purchase-api"
import { toast } from "sonner"

export const useAddPurchase = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await purchaseApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["purhcase"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the purchase."
      )
      console.error(error)
    },
  })
}

export const useGetAllPurchases = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const token = await getToken()
      return await purchaseApi.getAll(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetDetailPurchase = (fracture) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["purchase"],
    queryFn: async () => {
      const token = await getToken()
      return await purchaseApi.detail(fracture, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}
