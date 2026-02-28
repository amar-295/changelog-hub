import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useOutletContext } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  const context = useOutletContext();
  const isSidebarOpen = context?.isSidebarOpen ?? true;
  const setIsSidebarOpen = context?.setIsSidebarOpen ?? (() => {});
  const initials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor: "var(--color-bg-page)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-80 relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition-all placeholder:text-text-muted"
            style={{
              backgroundColor: "var(--color-bg-input)",
              color: "var(--color-text-primary)",
            }}
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-full transition-colors hover:bg-[#2f2f2f]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
          <span
            className="absolute top-2 right-2 size-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></span>
        </button>
        <div className="flex items-center gap-3 pl-4">
          <div className="text-right">
            <p
              className="text-sm font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {user?.fullName || "User"}
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {user?.role || "Member"}
            </p>
          </div>
          <div
            className="size-8 rounded-full flex items-center justify-center text-white font-medium text-xs tracking-wider"
            style={{
              background: "var(--color-primary-dark)",
            }}
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
