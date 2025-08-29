import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import productApi from "../api/product-api"
import { toast } from "sonner"
import useDebounce from "@/hooks/useDebounce"

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

export const useGetAllProducts = (page, category, search, limit = 10) => {
  const { getToken } = useAuth()
  const debouncedSearch = useDebounce(search, 500)
  const request = { page, limit, category, search: debouncedSearch }

  return useQuery({
    queryKey: ["products", page, category, debouncedSearch],
    queryFn: async () => {
      const token = await getToken()
      return await productApi.getAll(request, token)
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

export const useSearchProducts = (searchTerm, limit = 3) => {
  const { getToken } = useAuth()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  return useQuery({
    queryKey: ["search-products", debouncedSearchTerm],
    queryFn: async () => {
      const token = await getToken()
      return await productApi.search(
        { searchTerm: debouncedSearchTerm, limit },
        token
      )
    },
    enabled: debouncedSearchTerm.trim().length > 0,
    staleTime: 0,
  })
}
