const { axiosInstance } = require("@/lib/axios")

const sales = async (request, token) => {
  const response = await axiosInstance.get("/analysis/sales", {
    params: { ...request },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data.salesData
}

const analysisApi = {
  sales,
}
export default analysisApi
