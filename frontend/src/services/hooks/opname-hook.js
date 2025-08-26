import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import opnameApi from "../api/opname-api"
import { toast } from "sonner"

export const useAddOpname = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await opnameApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["opnames"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the opname stock."
      )
      console.error(error)
    },
  })
}

export const useGetAllOpnames = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["opnames"],
    queryFn: async () => {
      const token = await getToken()
      return await opnameApi.getAll(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetDetailOpname = (id) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["opname", id],
    queryFn: async () => {
      const token = await getToken()
      return await opnameApi.detail(id, token)
    },
  })
}

export const useUpdateOpname = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await opnameApi.update(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["opnames"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while updating the opname stock."
      )
      console.error(error)
    },
  })
}
