import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Releases from "./components/dashboard/Releases.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<DashboardLayout />}>
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
    <RouterProvider router={router} />
  </StrictMode>,
);
