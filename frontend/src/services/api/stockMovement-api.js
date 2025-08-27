import { axiosInstance } from "@/lib/axios"

const getAll = async (token) => {
  const response = await axiosInstance.get("/stock-movement", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.stockMovements
}

const stockMovementApi = {
  getAll,
}
export default stockMovementApi
