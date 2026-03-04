import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoWordmark from '../../../components/LogoWordmark';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(8,8,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="no-underline">
          <LogoWordmark size="md" hideTextOnMobile />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavClick(l.href)}
              className="text-[14px] font-medium cursor-pointer bg-transparent border-none transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
              }
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="text-[13.5px] font-medium no-underline px-4 py-2 rounded-lg transition-all duration-200"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="relative text-[13.5px] font-semibold no-underline px-5 py-2 rounded-lg overflow-hidden group transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(99,102,241,0.35)',
            }}
          >
            <span className="relative z-10">Start Free</span>
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 cursor-pointer bg-transparent border-none flex flex-col gap-[5px]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="w-5 h-px transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="w-5 h-px transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="w-5 h-px transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              transform: mobileOpen
                ? 'rotate(-45deg) translateY(-6px)'
                : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-3 flex flex-col gap-4"
          style={{
            backgroundColor: 'rgba(8,8,10,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavClick(l.href)}
              className="text-left text-[15px] font-medium cursor-pointer bg-transparent border-none py-1"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-medium no-underline"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-semibold no-underline"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff',
              }}
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
