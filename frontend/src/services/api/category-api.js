import { axiosInstance } from "../../lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/category/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("/category/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.categories
}

const remove = async (id, token) => {
  const response = await axiosInstance.delete(`/category/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const update = async ({ name, id }, token) => {
  const response = await axiosInstance.put(
    `/category/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

const categoryApi = {
  add,
  getAll,
  remove,
  update,
}
export default categoryApi
