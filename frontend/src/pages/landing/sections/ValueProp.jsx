import React from 'react';

const PROPS = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    headline: 'Rich Text Editor',
    description:
      'Write beautiful release notes with a powerful editor built for developers. Bold, lists, code blocks — everything you need.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    headline: 'Beautiful Public Page',
    description:
      'Get a custom branded changelog page your users will actually love visiting.',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    headline: 'Email Notifications',
    description:
      'Auto-send beautiful email updates to all your subscribers the moment you publish.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    headline: 'Subscriber Management',
    description:
      'See who follows your changelog. Manage, export, and grow your audience.',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    headline: 'Release Analytics',
    description:
      'Track views, engagement rates, and subscriber growth for every release you publish.',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    headline: 'Custom Domain',
    description:
      'Host on changelog.yourapp.com with full custom branding and SSL.',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
  },
];

function FeatureCard({ p }) {
  return (
    <div
      className="group p-8 rounded-2xl flex flex-col gap-5 transition-all duration-500 hover:-translate-y-2 cursor-default relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${p.color}44`;
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
      }}
    >
      <div
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ background: p.color }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{
          backgroundColor: p.bg,
          color: p.color,
          boxShadow: `0 8px 16px ${p.color}15`,
          border: `1px solid ${p.color}22`,
        }}
      >
        {p.icon}
      </div>
      <div>
        <h3
          className="text-[17px] font-bold mb-3 tracking-tight"
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {p.headline}
        </h3>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {p.description}
        </p>
      </div>
    </div>
  );
}

function ValueProp() {
  return (
    <section id="features" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <p
          className="text-[12px] font-bold tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-primary)' }}
        >
          Everything you need
        </p>
        <h2
          className="text-4xl md:text-[3.2rem] font-black tracking-tight leading-[1.1] mb-6"
          style={{
            color: 'rgba(255,255,255,0.98)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Built for product teams
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Stop letting your users wonder what changed. ChangelogHub makes
          release communication effortless, automated, and beautiful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPS.map((p) => (
          <FeatureCard key={p.headline} p={p} />
        ))}
      </div>
    </section>
  );
}

export default ValueProp;
