import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext"; // import AuthProvider
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    {" "}
    {/* เพิ่ม AuthProvider ครอบ App */}
    <App />
  </AuthProvider>
);
