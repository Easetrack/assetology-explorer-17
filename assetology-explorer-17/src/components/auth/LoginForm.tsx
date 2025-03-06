
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Lock, User, Building, Shield } from "lucide-react";
import { UserRole } from "@/types/auth";

const departments = [
  { id: "it", name: "Information Technology" },
  { id: "finance", name: "Finance" },
  { id: "hr", name: "Human Resources" },
  { id: "operations", name: "Operations" },
  { id: "logistics", name: "Logistics" },
];

const roles = [
  { id: "admin", name: "Administrator" },
  { id: "manager", name: "Manager" },
  { id: "user", name: "User" },
  { id: "guest", name: "Guest" },
];

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    department: "",
    role: "user" as UserRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.username || !formData.password || !formData.department) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.username, formData.password, formData.department, formData.role);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the login function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/40 shadow-lg w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                name="username"
                placeholder="john.doe"
                className="pl-10"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
              <Select value={formData.department} onValueChange={handleDepartmentChange}>
                <SelectTrigger id="department" className="pl-10">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleRoleChange(value as UserRole)}
              >
                <SelectTrigger id="role" className="pl-10">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <span>Forgot your password? </span>
          <a href="#" className="text-primary hover:text-primary/90 font-medium">
            Reset it
          </a>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          Version 1.0.0 &copy; {new Date().getFullYear()} Asset Management System
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
