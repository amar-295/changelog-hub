import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ScrollText,
  BarChart2,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const ICON_SIZE = 18;
const ICON_STROKE = 1.5;

const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, text: "Dashboard", end: true },
  { to: "/releases", icon: ScrollText, text: "Releases" },
  { to: "/analytics", icon: BarChart2, text: "Analytics" },
  { to: "/team", icon: Users, text: "Team" },
  { to: "/settings", icon: Settings, text: "Settings" },
];

function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className="relative z-20 shrink-0 flex flex-col overflow-hidden"
      style={{
        width: isOpen ? "260px" : "52px",
        backgroundColor: "var(--color-bg-sidebar)",
        borderRight: "1px solid var(--color-border)",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="pt-5 pb-6 px-2 w-full flex flex-col h-full overflow-hidden">
        {/* ── Header: Logo + Toggle ── */}
        <div
          className="flex items-center mb-8 h-8 relative w-full group cursor-pointer shrink-0"
          onClick={(e) => {
            if (!isOpen) {
              e.stopPropagation();
              setIsOpen(true);
            }
          }}
        >
          {/* Logo & wordmark */}
          <div className="absolute left-1 flex items-center gap-2.5">
            <img
              src="/icon.svg"
              alt="Logo"
              className={`size-7 shrink-0 transition-opacity duration-300 ${!isOpen ? "group-hover:opacity-0" : ""}`}
            />
            <h1
              className={`text-[14px] font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}
              style={{ color: "var(--color-text-primary)" }}
            >
              ChangelogHub
            </h1>
          </div>

          {/* Open icon (closed state hover) */}
          <div
            className={`absolute left-1 size-7 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen
                ? "opacity-0 invisible"
                : "opacity-0 group-hover:opacity-100"
            }`}
            style={{ color: "var(--color-text-secondary)" }}
          >
            <PanelLeftOpen
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE}
              className="group-hover:text-white transition-colors"
            />
          </div>

          {/* Close icon (open state) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            title="Close sidebar"
            className={`absolute right-1 p-1.5 rounded-lg transition-all duration-300 hover:bg-bg-page group/btn ${
              isOpen ? "opacity-100" : "opacity-0 invisible pointer-events-none"
            }`}
            style={{ color: "var(--color-text-secondary)" }}
          >
            <PanelLeftClose
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE}
              className="group-hover/btn:text-white transition-colors"
            />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="w-full flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ to, icon: Icon, text, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-[7px] w-full text-[13.5px] font-normal rounded-[10px] overflow-hidden whitespace-nowrap transition-colors hover:bg-bg-card ${
                  isActive
                    ? "text-white"
                    : "text-text-secondary hover:text-white"
                }`
              }
            >
              <Icon
                size={ICON_SIZE}
                strokeWidth={ICON_STROKE}
                className="shrink-0"
              />
              <span
                className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}
              >
                {text}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
