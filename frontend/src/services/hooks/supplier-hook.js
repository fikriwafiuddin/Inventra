import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import supplierApi from "../api/supplier-api"
import { toast } from "sonner"
import useDebounce from "@/hooks/useDebounce"

export const useAddSupplier = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken()
      return await supplierApi.add(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(["suppliers"])
      queryClient.invalidateQueries(["statistic-supplier"])
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while adding the supplier."
      )
      console.error(error)
    },
  })
}

export const useGetAllSuppliers = (page, status, search, limit = 10) => {
  const { getToken } = useAuth()
  const request = { page, status, search, limit }

  return useQuery({
    queryKey: ["suppliers", page, status, search, limit],
    queryFn: async () => {
      const token = await getToken()
      return await supplierApi.getAll(request, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateSupplier = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const token = await getToken()
      return await supplierApi.update(id, data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(["search-suppliers"])
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while updating the supplier."
      )
      console.error(error)
    },
  })
}

export const useUpdateStatusSupplier = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const token = await getToken()
      return await supplierApi.updateStatus(id, status, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(["suppliers"])
      queryClient.invalidateQueries(["statistic-supplier"])
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "An error occurred while updating the supplier status."
      )
      console.log(error)
    },
  })
}

export const useRemoveSupplier = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const token = await getToken()
      return await supplierApi.remove(id, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries(["statistic-supplier"])
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

export const useSearchSuppliers = (searchTerm, limit = 3) => {
  const { getToken } = useAuth()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  return useQuery({
    queryKey: ["search-suppliers", debouncedSearchTerm],
    queryFn: async () => {
      const token = await getToken()
      return await supplierApi.search(
        { searchTerm: debouncedSearchTerm, limit },
        token
      )
    },
    enabled: debouncedSearchTerm.trim().length > 0,
    staleTime: 0,
  })
}
