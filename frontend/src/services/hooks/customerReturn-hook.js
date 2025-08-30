import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import customerReturnApi from "../api/customerReturn-api"
import { toast } from "sonner"

export const useAddCustomerReturn = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await customerReturnApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["customer-return"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the customer return."
      )
      console.error(error)
    },
  })
}

export const useGetAllCustomerReturns = (start, end) => {
  const { getToken } = useAuth()
  const request = { start, end }

  return useQuery({
    queryKey: ["customer-return", start, end],
    queryFn: async () => {
      const token = await getToken()
      return await customerReturnApi.getAll(request, token)
    },
  })
}
