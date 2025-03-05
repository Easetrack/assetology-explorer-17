import axios from "axios";

const api = axios.create({
  baseURL: "https://webapi.easetrackwms.com/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
    'x-location': '001',
  },
});

// เพิ่ม interceptor เพื่อแนบ access_token อัตโนมัติ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
