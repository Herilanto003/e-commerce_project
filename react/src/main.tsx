import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { RefreshCartNumberProvider } from "./features/cart_management/context/RefreshCartNumberContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RefreshCartNumberProvider>
        <App />
      </RefreshCartNumberProvider>
    </AuthProvider>
  </StrictMode>,
);
