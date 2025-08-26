import { axiosInstance } from "@/lib/axios"

const add = async (data, token) => {
  const response = await axiosInstance.post("/opname", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (token) => {
  const response = await axiosInstance.get("/opname", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.opnames
}

const detail = async (id, token) => {
  const response = await axiosInstance.get(`/opname/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.opname
}

const update = async (data, token) => {
  const response = await axiosInstance.put("/opname", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const opnameApi = {
  add,
  getAll,
  detail,
  update,
}
export default opnameApi
