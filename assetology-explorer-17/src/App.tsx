
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AssetRegister from "./pages/AssetRegister";
import AssetReceived from "./pages/AssetReceived";
import AssetAssessment from "./pages/AssetAssessment";
import AssetMove from "./pages/AssetMove";
import AssetCount from "./pages/AssetCount";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            
            <Route path="/asset-register" element={
              <ProtectedRoute>
                <AssetRegister />
              </ProtectedRoute>
            } />
            
            <Route path="/asset-received" element={
              <ProtectedRoute>
                <AssetReceived />
              </ProtectedRoute>
            } />
            
            <Route path="/asset-assessment" element={
              <ProtectedRoute>
                <AssetAssessment />
              </ProtectedRoute>
            } />
            
            <Route path="/asset-move" element={
              <ProtectedRoute>
                <AssetMove />
              </ProtectedRoute>
            } />
            
            <Route path="/asset-count" element={
              <ProtectedRoute>
                <AssetCount />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
