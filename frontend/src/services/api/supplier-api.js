import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/supplier/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request, token) => {
  const response = await axiosInstance.get("/supplier", {
    params: { ...request },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body
}

const update = async (id, data, token) => {
  const response = await axiosInstance.patch(`/supplier/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const updateStatus = async (id, status, token) => {
  const response = await axiosInstance.patch(
    `/supplier/update/status/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

const remove = async (id, token) => {
  const response = await axiosInstance.delete(`/supplier/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const search = async ({ searchTerm, limit }, token) => {
  const response = await axiosInstance.get("/supplier/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { query: searchTerm, limit },
  })
  return response.data.body.suppliers
}

const supplierApi = {
  add,
  getAll,
  update,
  updateStatus,
  remove,
  search,
}
export default supplierApi
