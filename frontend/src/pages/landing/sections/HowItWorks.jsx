import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Write your release',
    description:
      'Use our powerful rich-text editor to craft your changelog entry. Add categories, version numbers, and publish on your schedule.',
    visual: (
      <div
        className="w-full rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: '#0e0e11',
          borderColor: 'rgba(255,255,255,0.09)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{
            backgroundColor: '#161618',
            borderColor: 'rgba(255,255,255,0.07)',
          }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#ff5f57' }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#ffbd2e' }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#28c840' }}
          />
          <span
            className="ml-2 text-[11.5px]"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            New Release
          </span>
        </div>
        <div className="p-5 space-y-3">
          <div
            className="h-8 rounded-lg px-3 flex items-center text-[13px] font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(59,130,246,0.4)',
            }}
          >
            v2.5 — Dark Mode & Performance
            <span
              className="ml-1 w-0.5 h-3.5 inline-block"
              style={{
                backgroundColor: 'var(--color-primary)',
                animation: 'blink 1s step-end infinite',
              }}
            />
          </div>
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="text-[12.5px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              <span
                style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}
              >
                What's new in v2.5
              </span>
              <br />
              Dark mode for all users. Performance is 3× faster on cold
              starts...
            </p>
          </div>
          <div className="flex gap-2">
            <span
              className="px-2.5 py-1 text-[11px] font-bold rounded-full"
              style={{
                backgroundColor: 'rgba(59,130,246,0.15)',
                color: '#60a5fa',
              }}
            >
              Feature
            </span>
            <span
              className="px-2.5 py-1 text-[11px] font-bold rounded-full"
              style={{
                backgroundColor: 'rgba(239,68,68,0.12)',
                color: '#f87171',
              }}
            >
              Bug Fix
            </span>
          </div>
        </div>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Publish with one click',
    description:
      'Hit publish and your changelog is live instantly. Your public page updates automatically — no code deploys, no waiting.',
    visual: (
      <div
        className="w-full rounded-2xl border p-5 flex flex-col gap-3"
        style={{
          backgroundColor: '#0e0e11',
          borderColor: 'rgba(255,255,255,0.09)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[13px] font-semibold"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            v2.4.0 — Dark Mode
          </span>
          <span
            className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full"
            style={{
              backgroundColor: 'rgba(52,211,153,0.12)',
              color: '#34d399',
            }}
          >
            ● Published
          </span>
        </div>
        <div
          className="h-px w-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        />
        <div
          className="flex items-center gap-2 text-[12.5px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Published Mar 4, 2026 · 2 minutes ago
        </div>
        <div
          className="w-full h-9 rounded-xl flex items-center justify-center text-[13px] font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            boxShadow: '0 0 20px rgba(99,102,241,0.35)',
          }}
        >
          View Public Page →
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Subscribers get notified',
    description:
      'Everyone who opted in gets a beautiful email the moment you ship. Keep your users engaged and coming back — automatically.',
    visual: (
      <div
        className="w-full rounded-2xl border p-5 space-y-3"
        style={{
          backgroundColor: '#0e0e11',
          borderColor: 'rgba(255,255,255,0.09)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[12px] font-bold"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Subscribers Notified
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(52,211,153,0.1)',
              color: '#34d399',
            }}
          >
            All delivered ✓
          </span>
        </div>
        {[
          { email: 'jan@stripe.com', color: '#3b82f6', time: 'Just now' },
          { email: 'alice@vercel.com', color: '#a78bfa', time: '30s ago' },
          { email: 'dev@linear.app', color: '#34d399', time: '1m ago' },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                }}
              >
                {s.email[0].toUpperCase()}
              </div>
              <span
                className="text-[12.5px]"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {s.email}
              </span>
            </div>
            <span
              className="text-[11px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {s.time}
            </span>
          </div>
        ))}
        <div
          className="rounded-xl p-3 flex items-center gap-3 mt-1"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(99,102,241,0.06))',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <div
              className="text-[12px] font-bold"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              📦 v2.5 delivered to inbox
            </div>
            <div
              className="text-[11px]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              142 subscribers · 89% open rate
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <p
          className="text-[11.5px] font-bold tracking-[0.16em] uppercase mb-4"
          style={{ color: 'var(--color-primary)' }}
        >
          How It Works
        </p>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight mb-5"
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Simple by design
        </h2>
        <p
          className="text-[17px] max-w-lg mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          From writing to your subscribers' inboxes in under a minute.
        </p>
      </div>

      <div className="flex flex-col gap-28">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-14`}
          >
            {/* Text */}
            <div className="flex-1">
              <span
                className="text-[80px] font-black leading-none mb-3 block"
                style={{
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1,
                  background:
                    'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(99,102,241,0.2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {step.number}
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  color: 'rgba(255,255,255,0.95)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-[15.5px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {step.description}
              </p>
            </div>
            {/* Visual */}
            <div className="flex-1 w-full md:max-w-sm">{step.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
