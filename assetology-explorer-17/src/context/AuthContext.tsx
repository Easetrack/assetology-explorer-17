import { createContext, useContext, useState, useEffect } from "react";
import {
  login as authLogin,
  logout as authLogout,
} from "../services/authService";

interface AuthContextType {
  user: unknown;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUser({ username: "admin" }); // ควรดึงข้อมูล user จาก API จริง ๆ
    }
  }, []);

  const login = async (username: string, password: string) => {
    await authLogin(username, password);
    setUser({ username });
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
