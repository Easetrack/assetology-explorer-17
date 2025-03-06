
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
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
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
