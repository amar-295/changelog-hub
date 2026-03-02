import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import NotificationBell from "./components/NotificationBell";
import ProfileDropdown from "./components/ProfileDropdown";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/releases": "Releases",
  "/analytics": "Analytics",
  "/team": "Team",
  "/settings": "Settings",
};

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out");
      navigate("/login");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header
      className="shrink-0 z-20 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor: "var(--color-bg-sidebar)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Left: Page Title + Search */}
      <div className="flex items-center gap-8">
        <h2
          className="text-[15px] font-semibold tracking-tight shrink-0"
          style={{ color: "var(--color-text-primary)" }}
        >
          {pageTitle}
        </h2>
        <SearchBar />
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-3 relative z-50">
        <NotificationBell />
        <div
          className="h-5 w-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />
        <ProfileDropdown user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
