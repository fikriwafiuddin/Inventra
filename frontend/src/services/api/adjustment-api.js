import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/adjustment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("/adjustment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.adjustments
}

const adjustmentApi = {
  add,
  getAll,
}
export default adjustmentApi
