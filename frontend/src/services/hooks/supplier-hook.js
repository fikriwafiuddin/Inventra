import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import supplierApi from "../api/supplier-api"
import { toast } from "sonner"

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

export const useGetAllSuppliers = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const token = await getToken()
      return await supplierApi.getAll(token)
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
      queryClient.invalidateQueries(["suppliers"])
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
