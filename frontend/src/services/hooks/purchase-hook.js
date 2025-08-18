import { useAuth } from "@clerk/nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
