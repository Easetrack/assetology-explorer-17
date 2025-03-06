
import { User } from "../types/auth";

export const getUser = (): User | null => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("access_token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};
