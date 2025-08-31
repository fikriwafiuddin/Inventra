import { axiosInstance } from "@/lib/axios"

const getAll = async (request, token) => {
  const response = await axiosInstance.get("/stock-movement", {
    params: { ...request },
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
