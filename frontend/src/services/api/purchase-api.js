import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/purchase/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const purchaseApi = {
  add,
}
export default purchaseApi
