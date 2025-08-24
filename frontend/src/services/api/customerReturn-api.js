import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/customer-return", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const customerReturnApi = {
  add,
}
export default customerReturnApi
