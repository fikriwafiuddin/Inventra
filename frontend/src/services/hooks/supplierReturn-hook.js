import { useAuth } from "@clerk/nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import supplierReturnApi from "../api/supplierReturn-api"
import { toast } from "sonner"

export const useAddSupplierReturn = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await supplierReturnApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(["supplier-returns"])
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the supplier return."
      )
      console.error(error)
    },
  })
}
