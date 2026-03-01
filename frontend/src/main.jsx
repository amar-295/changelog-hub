import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Releases from "./pages/releases/Releases.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="releases" element={<Releases />} />
        {/* <Route path="analytics" element={<Analytics />} />
      <Route path="team" element={<Team />} />
      <Route path="settings" element={<Settings />} /> */}
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1a1a", // Darker, sleeker background
            color: "#ededed", // Off-white crisp text
            border: "1px solid rgba(255, 255, 255, 0.08)", // ultra-subtle border
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "500",
            boxShadow:
              "0 0 0 1px rgba(0, 0, 0, 0.05), 0 text-[13px] 24px -8px rgba(0, 0, 0, 0.8)",
            padding: "10px 14px",
          },
          success: {
            iconTheme: {
              primary: "#38bdf8", // Sky blue for success instead of generic green
              secondary: "#2f2f2f",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // Red for errors
              secondary: "#2f2f2f",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
