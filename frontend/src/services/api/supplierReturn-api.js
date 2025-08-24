import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/supplier-return", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const supplierReturnApi = {
  add,
}
export default supplierReturnApi
