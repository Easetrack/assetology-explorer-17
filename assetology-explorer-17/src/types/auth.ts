
export interface User {
  username: string;
  department: string;
  role: UserRole;
  location?: string;
}

export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

export interface RoutePermission {
  roles: UserRole[];
  redirect: string;
}
