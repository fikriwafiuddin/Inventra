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

const detail = async (orderId, token) => {
  const response = await axiosInstance.get(`/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.order
}

const orderApi = {
  add,
  getAll,
  detail,
}
export default orderApi
