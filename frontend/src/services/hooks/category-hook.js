import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import categoryApi from "../api/category-api"
import { toast } from "sonner"

export const useAddCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await categoryApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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

export const useGetAllCategories = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const token = await getToken()
      return await categoryApi.getAll(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useRemoveCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const token = await getToken()
      return await categoryApi.remove(id, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the category."
      )
      console.error(error)
    },
  })
}

export const useUpdateCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ name, id }) => {
      const token = await getToken()
      return await categoryApi.update({ name, id }, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the category."
      )
      console.error(error)
    },
  })
}
