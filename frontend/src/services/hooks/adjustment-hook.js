import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import adjustmentApi from "../api/adjustment-api"
import { toast } from "sonner"

export const useAddAdjustment = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await adjustmentApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["adjustments"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the category."
      )
      console.error(error)
    },
  })
}

export const useGetAllAdjustments = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["adjustments"],
    queryFn: async () => {
      const token = await getToken()
      return await adjustmentApi.getAll(token)
    },
  })
}
