import React from 'react';
import LogoWordmark from '../../../components/LogoWordmark';

const COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

function Footer() {
  return (
    <footer
      className="px-6 pt-16 pb-8 max-w-6xl mx-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <LogoWordmark size="sm" />
          <p
            className="mt-4 text-[13px] leading-relaxed max-w-[200px]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Changelog management for modern product teams.
          </p>
        </div>

        {/* Links */}
        {COLS.map((col) => (
          <div key={col.heading}>
            <p
              className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13.5px] no-underline transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p
          className="text-[12.5px]"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          © 2026 ChangelogHub. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-[12.5px] no-underline transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')
            }
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[12.5px] no-underline transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')
            }
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
