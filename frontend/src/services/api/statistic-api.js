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

const stockMovementSummary = async (token) => {
  const response = await axiosInstance.get(
    "/statistic/stock-movement/summary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.body.statistic
}

const stockSummary = async (token) => {
  const response = await axiosInstance.get("/statistic/stock/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body
}

const dashboard = async (token) => {
  const response = await axiosInstance.get("/statistic/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body
}

const weeklyIncomeInMonth = async (token) => {
  const response = await axiosInstance.get("/statistic/weekly-income/month", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.body.weeklyIncomeInMonth
}

const statisticApi = {
  product,
  supplier,
  stockMovementSummary,
  dashboard,
  stockSummary,
  weeklyIncomeInMonth,
}
export default statisticApi
