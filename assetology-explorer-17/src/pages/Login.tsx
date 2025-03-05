import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // นำเข้า useAuth hook
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
import { Lock, User, Building } from "lucide-react";

const departments = [
  { id: "it", name: "Information Technology" },
  { id: "finance", name: "Finance" },
  { id: "hr", name: "Human Resources" },
  { id: "operations", name: "Operations" },
  { id: "logistics", name: "Logistics" },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ใช้ useAuth hook เพื่อเข้าถึงฟังก์ชัน login
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.username || !formData.password || !formData.department) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // เรียกใช้ login function จาก useAuth hook
      await login(formData.username, formData.password);

      // หากล็อกอินสำเร็จ
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(formData)); // เก็บข้อมูลผู้ใช้
      navigate("/"); // นำทางไปที่หน้าแรก
    } catch (error) {
      // หากเกิดข้อผิดพลาด
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false); // หมดสถานะโหลด
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Asset Management
          </h1>
          <p className="text-muted-foreground">
            Enterprise Resource Planning Solution
          </p>
        </div>

        <Card className="border-border/40 shadow-lg">
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
                  <Select
                    value={formData.department}
                    onValueChange={handleDepartmentChange}
                  >
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <span>Forgot your password? </span>
              <a
                href="#"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Reset it
              </a>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              Version 1.0.1 &copy; {new Date().getFullYear()} Asset Management Copy right by SRP
              System
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
