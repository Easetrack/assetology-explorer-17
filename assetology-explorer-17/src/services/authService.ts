import axios, { AxiosError } from "axios";
import axiosUrl from '../lib/axios'

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axiosUrl.post("/Auth", {
      username,
      password,
      grantType: "password",
      audience: "string",
      serialNo: "string",
      refreshToken: "string",
    });

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // คุณสามารถเข้าถึงข้อมูลจาก error ที่เป็น AxiosError ได้ที่นี่
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      // หาก error ไม่ใช่ AxiosError
      throw new Error("An unknown error occurred");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
