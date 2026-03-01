import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, Settings } from "lucide-react";
import { useTooltip } from "../../hooks/useTooltip";
import toast from "react-hot-toast";

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
  const [profileOpen, setProfileOpen] = useState(false);

  const bellTooltip = useTooltip();
  const avatarTooltip = useTooltip();

  const profileRef = useRef(null);
  const searchInputRef = useRef(null);

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  const initials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  // Close dropdown when clicking outside
  // Also handle '/' shortcut to focus search
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    function handleKeyDown(e) {
      // Don't focus if user is already typing in an input or textarea
      if (
        e.key === "/" &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA" &&
        !e.target.isContentEditable
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    try {
      await logout();
      toast.success("Signed out");
      navigate("/login");
    } catch (error) {
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

        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            ref={searchInputRef}
            className="w-52 pl-9 pr-14 py-1.5 rounded-lg text-[13px] outline-none placeholder:text-text-muted"
            style={{
              backgroundColor: "var(--color-bg-input)",
              color: "var(--color-text-primary)",
              border: "1px solid transparent",
              transition: "border-color 200ms ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-light)")
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
            placeholder="Search..."
            type="text"
          />
          <div
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[20px] h-[20px] text-[11px] font-semibold rounded"
            style={{
              color: "var(--color-text-muted)",
              backgroundColor: "var(--color-bg-card)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              border: "1px solid var(--color-border)",
            }}
          >
            /
          </div>
        </div>
      </div>

      {/* Right: Notifications + Avatar */}
      <div className="flex items-center gap-3 relative z-50">
        {/* Notifications */}
        <div
          className="relative"
          onMouseEnter={bellTooltip.showTooltip}
          onMouseLeave={bellTooltip.hideTooltip}
        >
          <button
            onClick={() => {
              bellTooltip.hideAndSuppress();
              // handle notification click
            }}
            className="relative p-2 rounded-lg transition-colors hover:bg-bg-card cursor-pointer"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Notifications"
          >
            <Bell size={17} strokeWidth={1.5} />
            <span
              className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </button>
          {/* Tooltip */}
          {bellTooltip.isVisible && (
            <div
              className="absolute top-full left-1/2 mt-[18px] px-2.5 py-1.5 rounded-lg
                text-[11px] font-semibold whitespace-nowrap text-white
                pointer-events-none z-50 flex items-center tooltip-visible"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                transform: "translateX(-50%)",
              }}
            >
              Notifications
              {/* Up-pointing arrow connecting to the button */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderBottom: "5px solid #1a1a1a",
                }}
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className="h-5 w-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        {/* Avatar */}
        <div
          className="relative group p-[1.5px] flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-white/15"
          ref={profileRef}
          onMouseEnter={avatarTooltip.showTooltip}
          onMouseLeave={avatarTooltip.hideTooltip}
          onClick={() => {
            setProfileOpen((v) => !v);
            avatarTooltip.hideAndSuppress();
          }}
          aria-label="Account menu"
        >
          <div
            className="flex items-center justify-center size-[34px] rounded-full text-[13px] font-bold text-white shadow-sm"
            style={{
              backgroundColor: "var(--color-bg-sidebar)",
              border: "1px solid var(--color-border)",
            }}
          >
            {initials}
          </div>

          {/* Avatar Tooltip */}
          {avatarTooltip.isVisible && !profileOpen && (
            <div
              className="absolute top-full left-1/2 mt-[18px] px-2.5 py-1.5 rounded-lg
                text-[11px] font-semibold whitespace-nowrap text-white
                pointer-events-none z-50 flex items-center tooltip-visible"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                transform: "translateX(-50%)",
              }}
            >
              Account
              {/* Up-pointing arrow connecting to the button */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderBottom: "5px solid #1a1a1a",
                }}
              />
            </div>
          )}
          {/* Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-60 rounded-xl shadow-xl overflow-hidden z-50 animate-dropdown"
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* User info */}
              <div className="flex flex-col items-center gap-2 px-5 py-5">
                <div
                  className="size-12 rounded-full flex items-center justify-center text-white font-semibold text-base"
                  style={{ background: "var(--color-primary-dark)" }}
                >
                  {initials}
                </div>
                <div className="text-center">
                  <p
                    className="text-[14px] font-semibold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {user?.fullName || "User"}
                  </p>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                }}
              />

              {/* Actions */}
              <div className="py-1.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors hover:bg-bg-card-hover text-left"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <Settings size={15} strokeWidth={1.5} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors hover:bg-bg-card-hover text-left"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <LogOut size={15} strokeWidth={1.5} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
