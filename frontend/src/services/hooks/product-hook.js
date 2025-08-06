import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import productApi from "../api/product-api"
import { toast } from "sonner"

export const useAddProduct = (data) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await productApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["statistic-product"] })
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

export const useGetAllProducts = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const token = await getToken()
      return await productApi.getAll(token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useRemoveProduct = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const token = await getToken()
      return await productApi.remove(id, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while removing the product."
      )
      console.error(error)
    },
  })
}

export const useDetailProduct = (sku) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const token = await getToken()
      return await productApi.detail(sku, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateProduct = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await productApi.update(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(["products"])
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while updating the product."
      )
      console.error(error)
    },
  })
}
