
import { UserRole } from "../types/auth";

// Define route permissions for each path
export const routePermissions: Record<string, UserRole[]> = {
  "/": ["admin", "manager", "user", "guest"],
  "/asset-register": ["admin", "manager", "user"],
  "/asset-received": ["admin", "manager", "user"],
  "/asset-assessment": ["admin", "manager"],
  "/asset-move": ["admin", "manager", "user"],
  "/asset-count": ["admin", "manager", "user"],
  "/reports": ["admin", "manager"],
  "/settings": ["admin"],
};

// Check if a user has permission to access a route
export const hasPermission = (
  userRole: UserRole | undefined,
  route: string
): boolean => {
  if (!userRole) return false;
  
  // Find the closest matching route path
  const paths = Object.keys(routePermissions);
  const matchingPath = paths.find(path => route.startsWith(path));
  
  if (!matchingPath) return false;
  
  return routePermissions[matchingPath].includes(userRole);
};

// Get accessible routes for a role
export const getAccessibleRoutes = (role: UserRole): string[] => {
  return Object.entries(routePermissions)
    .filter(([_, roles]) => roles.includes(role))
    .map(([route]) => route);
};
