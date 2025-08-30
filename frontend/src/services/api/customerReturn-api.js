import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/customer-return", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request, token) => {
  const response = await axiosInstance.get("/customer-return", {
    params: { ...request },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.customerReturns
}

const customerReturnApi = {
  add,
  getAll,
}
export default customerReturnApi
