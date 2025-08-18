import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/product/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("product", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.products
}

const remove = async (id, token) => {
  const response = await axiosInstance.delete(`/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const detail = async (sku, token) => {
  const response = await axiosInstance.get(`/product/detail/${sku}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.product
}

const update = async (data, token) => {
  const response = await axiosInstance.patch("/product/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

const search = async ({ searchTerm, limit }, token) => {
  const response = await axiosInstance.get("/product/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { query: searchTerm, limit },
  })
  return response.data.body.products
}

const productApi = {
  add,
  getAll,
  remove,
  detail,
  update,
  search,
}
export default productApi
