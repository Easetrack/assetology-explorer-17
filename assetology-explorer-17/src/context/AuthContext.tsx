
import { createContext, useContext, useState, useEffect } from "react";
import {
  login as authLogin,
  logout as authLogout,
} from "../services/authService";
import { User, UserRole } from "../types/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, department: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Ensure role is set - default to 'user' if not present in stored data
        const userWithRole: User = {
          ...userData,
          role: userData.role || 'user'
        };
        setUser(userWithRole);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const login = async (username: string, password: string, department: string, role: UserRole = "user") => {
    try {
      await authLogin(username, password);
      
      const newUser: User = {
        username,
        department,
        role
      };
      
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success(`Logged in as ${username} with ${role} role`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
