import React from 'react';

const LOGOS = [
  { name: 'Stripe', icon: '⚡' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Linear', icon: '◐' },
  { name: 'Notion', icon: '□' },
  { name: 'Figma', icon: '◈' },
  { name: 'Supabase', icon: '⬡' },
  { name: 'PlanetScale', icon: '◉' },
  { name: 'Railway', icon: '⬢' },
];

const all = [...LOGOS, ...LOGOS];

function SocialProof() {
  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <p
        className="text-center text-[11.5px] font-semibold tracking-[0.18em] uppercase mb-10"
        style={{ color: 'rgba(255,255,255,0.22)' }}
      >
        Trusted by developers at
      </p>

      {/* Scrolling strip with edge fades */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="flex gap-14 items-center whitespace-nowrap shrink-0"
          style={{
            animation: 'marquee 28s linear infinite',
            paddingRight: '3.5rem',
          }}
        >
          {all.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-300"
            >
              <span
                className="text-[15px]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {logo.icon}
              </span>
              <span
                className="text-[14px] font-bold tracking-tight"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

export default SocialProof;
