import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      className="w-64 flex flex-col justify-between border-r"
      style={{
        backgroundColor: "var(--color-bg-sidebar)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="size-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: "var(--color-primary-dark)" }}
          >
            <span className="material-symbols-outlined">hub</span>
          </div>
          <h1
            className="text-xl font-black tracking-tight uppercase"
            style={{ color: "var(--color-text-primary)" }}
          >
            ChangelogHub
          </h1>
        </div>
        <nav className="space-y-1">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(129, 140, 248, 0.12)"
                : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)",
            })}
            to="/"
            end
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "font-semibold" : ""}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(129, 140, 248, 0.12)"
                : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)",
            })}
            to="/releases"
          >
            <span className="material-symbols-outlined">description</span>
            <span>Updates</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "font-semibold" : ""}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(129, 140, 248, 0.12)"
                : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)",
            })}
            to="/analytics"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "font-semibold" : ""}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(129, 140, 248, 0.12)"
                : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)",
            })}
            to="/team"
          >
            <span className="material-symbols-outlined">group</span>
            <span>Team</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "font-semibold" : ""}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "rgba(129, 140, 248, 0.12)"
                : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)",
            })}
            to="/settings"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
      <div
        className="p-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
