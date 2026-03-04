import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ScrollText,
  BarChart2,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ChevronRight,
  Plus,
  List,
} from 'lucide-react';
import { useTooltip } from '../../hooks/useTooltip';

const ICON_SIZE = 18;
const ICON_STROKE = 1.5;

const RELEASE_CHILDREN = [
  { to: '/releases/new', icon: Plus, text: 'Create Release' },
  { to: '/releases', icon: List, text: 'All Releases', end: true },
];

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, text: 'Dashboard', end: true },
  {
    to: '/releases',
    icon: ScrollText,
    text: 'Releases',
    children: RELEASE_CHILDREN,
  },
  { to: '/subscribers', icon: Users, text: 'Subscribers' },
  { to: '/settings', icon: Settings, text: 'Settings' },
];

function Sidebar({ isOpen, setIsOpen }) {
  const [headerHovered, setHeaderHovered] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [navItemRects, setNavItemRects] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [releasesOpen, setReleasesOpen] = useState(false);
  const itemRefs = useRef({});

  const toggleTooltip = useTooltip();

  // Handle window resize for dynamic layout checks
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const location = useLocation();

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
    window.addEventListener('resize', handleRecalculate);
    window.addEventListener('scroll', handleRecalculate, true);
    return () => {
      window.removeEventListener('resize', handleRecalculate);
      window.removeEventListener('scroll', handleRecalculate, true);
    };
  }, [hoveredNavItem]);

  // Sidebar dynamic width based on state and viewport
  const getSidebarWidth = () => {
    if (isMobile) return isOpen ? '240px' : '0px';
    return isOpen ? '240px' : '52px';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`shrink-0 flex flex-col overflow-visible transition-all duration-300 ease-in-out ${
          isMobile
            ? 'fixed top-0 left-0 h-full z-100'
            : 'relative z-50 pointer-events-auto'
        }`}
        style={{
          width: getSidebarWidth(),
          backgroundColor: 'var(--color-bg-sidebar)',
          borderRight: '1px solid var(--color-border)',
          boxShadow:
            isMobile && isOpen ? '20px 0 50px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div
          className={`pt-5 pb-6 px-2 w-full flex flex-col h-full overflow-visible transition-opacity duration-200 ${
            isMobile && !isOpen
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100'
          }`}
        >
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
                  !isOpen && headerHovered ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>

            {/* Open icon (closed state hover) */}
            <div
              role="button"
              aria-label="Open sidebar"
              className={`absolute left-1 size-7 flex items-center justify-center rounded-lg transition-all duration-300 ${
                isOpen
                  ? 'opacity-0 invisible'
                  : headerHovered
                    ? 'opacity-100'
                    : 'opacity-0'
              }`}
              style={{
                color: headerHovered ? 'white' : 'var(--color-text-secondary)',
              }}
            >
              <PanelLeftOpen size={ICON_SIZE} strokeWidth={ICON_STROKE} />
            </div>

            {/* Tooltip for Open Sidebar */}
            {!isOpen && headerHovered && toggleTooltip.isVisible && (
              <div
                className="absolute left-[52px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999 flex items-center tooltip-visible-right"
                style={{
                  backgroundColor: 'var(--color-bg-tooltip)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                }}
              >
                Expand Sidebar
                <div
                  className="absolute top-1/2 right-full -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderRight: '5px solid var(--color-bg-tooltip)',
                  }}
                />
              </div>
            )}

            {/* Close icon (open state) */}
            <div
              className={`absolute right-1 transition-all duration-300 ${
                isOpen
                  ? 'opacity-100'
                  : 'opacity-0 invisible pointer-events-none'
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
                className="p-1.5 rounded-lg hover:bg-bg-card-hover active:scale-95 group/btn text-text-secondary cursor-pointer transition-all"
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
                    backgroundColor: 'var(--color-bg-tooltip)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                    animation:
                      'tooltipFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                >
                  Collapse Sidebar
                  <div
                    className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid var(--color-bg-tooltip)',
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
              const hasChildren = !!item.children;
              const isExpanded = hasChildren && isOpen && releasesOpen;

              return (
                <div key={to}>
                  <div
                    ref={(el) => (itemRefs.current[to] = el)}
                    className="relative group/item"
                    onMouseEnter={() => {
                      setHoveredNavItem(to);
                      updateHoverRect(to);
                    }}
                    onMouseLeave={() => setHoveredNavItem(null)}
                  >
                    {hasChildren && isOpen ? (
                      /* Expandable toggle — only when sidebar is open */
                      <button
                        type="button"
                        onClick={() => setReleasesOpen((v) => !v)}
                        className={`flex items-center gap-2 px-2 py-[7px] w-full text-[13.5px] font-normal rounded-[10px] transition-all hover:bg-bg-card-hover active:scale-[0.98] cursor-pointer ${
                          isExpanded
                            ? 'text-white'
                            : 'text-text-secondary hover:text-white'
                        }`}
                      >
                        <Icon
                          size={ICON_SIZE}
                          strokeWidth={ICON_STROKE}
                          className="shrink-0"
                        />
                        <span className="flex-1 text-left overflow-hidden whitespace-nowrap">
                          {text}
                        </span>
                        <ChevronRight
                          size={14}
                          strokeWidth={1.5}
                          className={`shrink-0 text-text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      /* Regular NavLink (also used for Releases when sidebar is collapsed) */
                      <NavLink
                        to={to}
                        end={end}
                        aria-label={text}
                        onClick={() => {
                          setHoveredNavItem(null);
                          if (isMobile) setIsOpen(false);
                        }}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-[7px] w-full text-[13.5px] font-normal rounded-[10px] transition-all hover:bg-bg-card-hover active:scale-[0.98] ${
                            isActive
                              ? 'text-white'
                              : 'text-text-secondary hover:text-white'
                          }`
                        }
                      >
                        <Icon
                          size={ICON_SIZE}
                          strokeWidth={ICON_STROKE}
                          className="shrink-0"
                        />
                        <span
                          className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
                            isOpen ? 'opacity-100' : 'opacity-0 invisible'
                          }`}
                        >
                          {text}
                        </span>
                      </NavLink>
                    )}

                    {/* Tooltip via portal (collapsed sidebar only) */}
                    {!isOpen &&
                      hoveredNavItem === to &&
                      rect &&
                      createPortal(
                        <div
                          className="fixed px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999 flex items-center tooltip-visible-right"
                          style={{
                            top: rect.top + rect.height / 2,
                            left: rect.right + 12,
                            backgroundColor: 'var(--color-bg-tooltip)',
                            border: '1px solid rgba(255,255,255,0.16)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                          }}
                        >
                          {text}
                          <div
                            className="absolute top-1/2 right-full -translate-y-1/2 w-0 h-0"
                            style={{
                              borderTop: '5px solid transparent',
                              borderBottom: '5px solid transparent',
                              borderRight: '5px solid var(--color-bg-tooltip)',
                            }}
                          />
                        </div>,
                        document.body
                      )}
                  </div>

                  {/* Sub-items (expanded sidebar only) */}
                  {hasChildren && isOpen && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isExpanded
                          ? 'max-h-52 opacity-100 mt-0.5'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-5 pl-3 border-l border-white/8 flex flex-col gap-0.5 pb-1.5">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              end={child.end}
                              aria-label={child.text}
                              onClick={() => {
                                if (isMobile) setIsOpen(false);
                              }}
                              className={() => {
                                // For query-param routes, match both pathname and search
                                let isChildActive;
                                if (child.to.includes('?')) {
                                  const [childPath, childSearch] =
                                    child.to.split('?');
                                  isChildActive =
                                    location.pathname === childPath &&
                                    location.search === `?${childSearch}`;
                                } else {
                                  isChildActive =
                                    location.pathname === child.to;
                                }
                                return `flex items-center gap-2 px-2 py-[5px] w-full text-[12.5px] rounded-[8px] transition-all hover:bg-bg-card-hover active:scale-[0.98] ${
                                  isChildActive
                                    ? 'text-white font-medium'
                                    : 'text-text-muted hover:text-white font-normal'
                                }`;
                              }}
                            >
                              <ChildIcon
                                size={14}
                                strokeWidth={1.5}
                                className="shrink-0"
                              />
                              <span>{child.text}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
