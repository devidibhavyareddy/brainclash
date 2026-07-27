import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              color: "#f8fafc",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
              padding: "14px 16px",
              fontSize: "0.95rem",
              fontWeight: 600,
            },
            success: {
              style: {
                borderColor: "rgba(34, 197, 94, 0.55)",
                background: "rgba(22, 101, 52, 0.95)",
              },
              iconTheme: {
                primary: "#22c55e",
                secondary: "#f8fafc",
              },
            },
            error: {
              style: {
                borderColor: "rgba(239, 68, 68, 0.55)",
                background: "rgba(127, 29, 29, 0.95)",
              },
              iconTheme: {
                primary: "#ef4444",
                secondary: "#f8fafc",
              },
            },
          }}
        />

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);