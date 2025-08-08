import { axiosInstance } from "@/lib/axios"

const product = async (token) => {
  const response = await axiosInstance.get("/statistic/product", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.statistic
}

const supplier = async (token) => {
  const response = await axiosInstance.get("/statistic/supplier", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.statistic
}

const statisticApi = {
  product,
  supplier,
}
export default statisticApi
