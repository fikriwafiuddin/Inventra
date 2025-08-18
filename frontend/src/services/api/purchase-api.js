import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/purchase/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("/purchase", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.purchases
}

const purchaseApi = {
  add,
  getAll,
}
export default purchaseApi
