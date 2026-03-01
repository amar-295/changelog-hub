import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScrollText,
  BarChart2,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useTooltip } from "../../hooks/useTooltip";

const ICON_SIZE = 18;
const ICON_STROKE = 1.5;

const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, text: "Dashboard", end: true },
  { to: "/releases", icon: ScrollText, text: "Releases" },
  { to: "/analytics", icon: BarChart2, text: "Analytics" },
  { to: "/team", icon: Users, text: "Team" },
];

function Sidebar({ isOpen, setIsOpen }) {
  const [headerHovered, setHeaderHovered] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [navItemRects, setNavItemRects] = useState({});
  const itemRefs = useRef({});

  const toggleTooltip = useTooltip();

  // Helper to update coordinates of the hovered nav item
  const updateHoverRect = (to) => {
    const el = itemRefs.current[to];
    if (el) {
      setNavItemRects((prev) => ({
        ...prev,
        [to]: el.getBoundingClientRect(),
      }));
    }
  };

  // Keep coordinates updated on scroll or resize
  useEffect(() => {
    const handleRecalculate = () => {
      if (hoveredNavItem) updateHoverRect(hoveredNavItem);
    };
    window.addEventListener("resize", handleRecalculate);
    window.addEventListener("scroll", handleRecalculate, true);
    return () => {
      window.removeEventListener("resize", handleRecalculate);
      window.removeEventListener("scroll", handleRecalculate, true);
    };
  }, [hoveredNavItem]);

  return (
    <aside
      className="relative z-50 shrink-0 flex flex-col overflow-visible"
      style={{
        width: isOpen ? "260px" : "52px",
        backgroundColor: "var(--color-bg-sidebar)",
        borderRight: "1px solid var(--color-border)",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="pt-5 pb-6 px-2 w-full flex flex-col h-full overflow-visible">
        {/* ── Header: Logo + Toggle ── */}
        <div
          className="flex items-center mb-8 h-8 relative w-full cursor-pointer shrink-0 overflow-visible"
          onMouseEnter={() => {
            setHeaderHovered(true);
            if (!isOpen) toggleTooltip.showTooltip();
          }}
          onMouseLeave={() => {
            setHeaderHovered(false);
            if (!isOpen) toggleTooltip.hideTooltip();
          }}
          onClick={(e) => {
            if (!isOpen) {
              e.stopPropagation();
              setIsOpen(true);
              toggleTooltip.hideAndSuppress();
            }
          }}
        >
          {/* Logo Only */}
          <div className="absolute left-1 flex items-center gap-2.5">
            <img
              src="/icon.svg"
              alt="Logo"
              className={`size-7 shrink-0 transition-opacity duration-300 ${
                !isOpen && headerHovered ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>

          {/* Open icon (closed state hover) */}
          <div
            role="button"
            aria-label="Open sidebar"
            className={`absolute left-1 size-7 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen
                ? "opacity-0 invisible"
                : headerHovered
                  ? "opacity-100"
                  : "opacity-0"
            }`}
            style={{
              color: headerHovered ? "white" : "var(--color-text-secondary)",
            }}
          >
            <PanelLeftOpen size={ICON_SIZE} strokeWidth={ICON_STROKE} />
          </div>

          {/* Tooltip for Open Sidebar */}
          {!isOpen && headerHovered && toggleTooltip.isVisible && (
            <div
              className="absolute left-[52px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999 flex items-center tooltip-visible-right"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              Expand Sidebar
              <div
                className="absolute top-1/2 right-full -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderRight: "5px solid #1a1a1a",
                }}
              />
            </div>
          )}

          {/* Close icon (open state) */}
          <div
            className={`absolute right-1 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 invisible pointer-events-none"
            }`}
            onMouseEnter={() => {
              if (isOpen) toggleTooltip.showTooltip();
            }}
            onMouseLeave={() => {
              if (isOpen) toggleTooltip.hideTooltip();
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                toggleTooltip.hideAndSuppress();
              }}
              aria-label="Close sidebar"
              className="p-1.5 rounded-lg hover:bg-bg-card group/btn text-text-secondary cursor-pointer"
            >
              <PanelLeftClose
                size={ICON_SIZE}
                strokeWidth={ICON_STROKE}
                className="group-hover/btn:text-white transition-colors"
              />
            </button>

            {/* Tooltip for Close Sidebar */}
            {isOpen && toggleTooltip.isVisible && (
              <div
                className="absolute right-[110%] mr-1 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999 flex items-center tooltip-visible"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  animation:
                    "tooltipFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                Collapse Sidebar
                <div
                  className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "5px solid #1a1a1a",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="w-full flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const to = item.to;
            const text = item.text;
            const end = item.end;
            const rect = navItemRects[to];
            return (
              <div
                key={to}
                ref={(el) => (itemRefs.current[to] = el)}
                className="relative group/item"
                onMouseEnter={() => {
                  setHoveredNavItem(to);
                  updateHoverRect(to);
                }}
                onMouseLeave={() => setHoveredNavItem(null)}
              >
                <NavLink
                  to={to}
                  end={end}
                  aria-label={text}
                  onClick={() => setHoveredNavItem(null)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-[7px] w-full text-[13.5px] font-normal rounded-[10px] transition-colors hover:bg-bg-card ${
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
                    className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    {text}
                  </span>
                </NavLink>

                {/* Tooltip Rendered via Portal */}
                {!isOpen &&
                  hoveredNavItem === to &&
                  rect &&
                  createPortal(
                    <div
                      className="fixed px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999 flex items-center tooltip-visible-right"
                      style={{
                        top: rect.top + rect.height / 2,
                        left: rect.right + 12, // 12px margin from the item
                        backgroundColor: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {text}
                      {/* Left-pointing arrow connecting to the button */}
                      <div
                        className="absolute top-1/2 right-full -translate-y-1/2 w-0 h-0"
                        style={{
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderRight: "5px solid #1a1a1a",
                        }}
                      />
                    </div>,
                    document.body,
                  )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
