import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/purchase/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request, token) => {
  const response = await axiosInstance.get("/purchase", {
    params: { ...request },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.purchases
}

const detail = async (invoice, token) => {
  const response = await axiosInstance.get(`/purchase/${invoice}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.purchase
}

const purchaseApi = {
  add,
  getAll,
  detail,
}
export default purchaseApi
