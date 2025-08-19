import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const orderApi = {
  add,
}
export default orderApi
