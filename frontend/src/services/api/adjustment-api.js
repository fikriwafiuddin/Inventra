import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/adjustment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const adjustmentApi = {
  add,
}
export default adjustmentApi
