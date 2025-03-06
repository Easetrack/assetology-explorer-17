
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { hasPermission } from "@/utils/rbac";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userHasAccess = hasPermission(user?.role, location.pathname);

  if (!userHasAccess) {
    toast.error("You don't have permission to access this page");
    
    // Redirect based on role
    if (user?.role === 'admin' || user?.role === 'manager') {
      return <Navigate to="/" replace />;
    } else {
      // Lower-level roles get redirected to a limited view
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
