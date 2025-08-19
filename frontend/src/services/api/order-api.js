import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.orders
}

const orderApi = {
  add,
  getAll,
}
export default orderApi
