import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ── Reusable Window Chrome ──────────────────────────────── */
function WindowChrome({ url, children, glowColor = 'rgba(59,130,246,0.3)' }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: '#0e0e11',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${glowColor}`,
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: '#161618',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
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
        {url && (
          <div
            className="ml-3 flex-1 h-5 rounded-md flex items-center px-3 text-[11px]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.28)',
            }}
          >
            {url}
          </div>
        )}
        {!url && (
          <span
            className="ml-2 text-[11.5px]"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            ChangelogHub
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Frame 1: Release Editor ─────────────────────────────── */
function EditorMockup() {
  return (
    <WindowChrome glowColor="rgba(59,130,246,0.2)">
      <div className="p-5 flex flex-col gap-4">
        {/* Nav tabs */}
        <div
          className="flex gap-4 border-b pb-3"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {['Write', 'Preview', 'Settings'].map((t, i) => (
            <span
              key={t}
              className="text-[12px] font-semibold pb-2 -mb-3"
              style={{
                color:
                  i === 0 ? 'var(--color-primary)' : 'rgba(255,255,255,0.28)',
                borderBottom:
                  i === 0 ? '2px solid var(--color-primary)' : 'none',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            Title
          </div>
          <div
            className="h-9 rounded-lg px-3 flex items-center text-[14px] font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(59,130,246,0.5)',
              boxShadow: '0 0 0 3px rgba(59,130,246,0.08)',
            }}
          >
            v2.5 — Dark Mode &amp; Performance Boost
            <span
              className="ml-1 w-0.5 h-4 inline-block animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 flex-wrap">
          {['B', 'I', 'U', '{ }', '—', '🔗'].map((t) => (
            <button
              key={t}
              className="px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {t}
            </button>
          ))}
          <div
            className="h-4 w-px mx-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />
          {['Bug Fix', 'Feature', 'Security'].map((t, i) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: [
                  'rgba(239,68,68,0.12)',
                  'rgba(59,130,246,0.15)',
                  'rgba(234,179,8,0.12)',
                ][i],
                color: ['#f87171', 'var(--color-primary)', '#fbbf24'][i],
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="rounded-xl p-4 text-[13px] leading-relaxed"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.65)',
            minHeight: 100,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
            What's new in v2.5
          </span>
          <br />
          We shipped dark mode following months of user feedback. Performance is
          now{' '}
          <span style={{ color: '#34d399', fontWeight: 600 }}>
            3× faster
          </span>{' '}
          on cold starts...
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <div
            className="flex-1 py-2 rounded-lg text-center text-[12px] font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            Save Draft
          </div>
          <div
            className="flex-1 py-2 rounded-lg text-center text-[12px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)',
            }}
          >
            Publish Release →
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

/* ── Frame 2: Public Changelog Page ─────────────────────── */
function PublicPageMockup() {
  const releases = [
    {
      version: 'v2.5',
      title: 'Dark Mode & Performance',
      tag: 'Feature',
      date: 'Mar 4',
      live: true,
    },
    {
      version: 'v2.4',
      title: 'Subscriber Management',
      tag: 'Feature',
      date: 'Feb 20',
    },
    {
      version: 'v2.3',
      title: 'Bug Fixes & Stability',
      tag: 'Bugfix',
      date: 'Jan 15',
    },
  ];

  return (
    <WindowChrome
      url="changelog.streamline.io"
      glowColor="rgba(129,140,248,0.2)"
    >
      <div className="p-5">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] font-black text-white"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              }}
            >
              S
            </div>
            <div>
              <div
                className="text-[13px] font-bold"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                Streamline
              </div>
              <div
                className="text-[10px]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Product Updates
              </div>
            </div>
          </div>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff',
              boxShadow: '0 0 12px rgba(99,102,241,0.4)',
            }}
          >
            Subscribe →
          </div>
        </div>

        {/* Release list */}
        <div className="flex flex-col gap-0">
          {releases.map((r, i) => (
            <div
              key={r.version}
              className="flex items-start gap-4 py-3.5"
              style={{
                borderBottom:
                  i < releases.length - 1
                    ? '1px solid rgba(255,255,255,0.05)'
                    : 'none',
              }}
            >
              <div className="shrink-0 w-12 text-right pt-0.5">
                <div
                  className="text-[9px] font-mono"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {r.date}
                </div>
              </div>
              <div
                className="shrink-0 w-0.5 self-stretch rounded-full"
                style={{
                  background:
                    r.tag === 'Feature'
                      ? 'linear-gradient(to bottom, #3b82f6, transparent)'
                      : 'linear-gradient(to bottom, #f87171, transparent)',
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[11px] font-black font-mono"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {r.version}
                  </span>
                  <span
                    className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md"
                    style={{
                      backgroundColor:
                        r.tag === 'Feature'
                          ? 'rgba(59,130,246,0.15)'
                          : 'rgba(239,68,68,0.15)',
                      color:
                        r.tag === 'Feature'
                          ? 'var(--color-primary)'
                          : '#f87171',
                    }}
                  >
                    {r.tag}
                  </span>
                  {r.live && (
                    <span
                      className="flex items-center gap-1 text-[9px] font-bold"
                      style={{ color: '#34d399' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <div
                  className="text-[12.5px] font-semibold"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                >
                  {r.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
}

/* ── Frame 3: Subscribers + Notification ─────────────────── */
function SubscriberMockup() {
  return (
    <div className="w-full max-w-lg flex flex-col gap-3">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Subscribers', value: '1,247', color: '#3b82f6' },
          { label: 'Opened', value: '89%', color: '#34d399' },
          { label: 'Releases', value: '38', color: '#a78bfa' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center"
            style={{
              backgroundColor: '#161618',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="text-[18px] font-black mb-0.5"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div
              className="text-[10px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Subscriber list */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0e0e11',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span
            className="text-[12px] font-bold"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Recently Notified
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(52,211,153,0.12)',
              color: '#34d399',
            }}
          >
            All delivered ✓
          </span>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {[
            {
              email: 'jan@stripe.com',
              avatar: 'J',
              time: 'just now',
              color: '#3b82f6',
            },
            {
              email: 'alice@vercel.com',
              avatar: 'A',
              time: '30s ago',
              color: '#a78bfa',
            },
            {
              email: 'dev@linear.app',
              avatar: 'D',
              time: '1m ago',
              color: '#34d399',
            },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                  }}
                >
                  {s.avatar}
                </div>
                <div>
                  <div
                    className="text-[12px] font-medium"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {s.email}
                  </div>
                </div>
              </div>
              <span
                className="text-[10px]"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated email notification */}
      <div
        className="rounded-2xl p-4 flex items-start gap-3"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))',
          border: '1px solid rgba(99,102,241,0.35)',
          boxShadow: '0 0 30px rgba(99,102,241,0.15)',
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 relative"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
        >
          <svg
            width="16"
            height="16"
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
          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 animate-ping"
            style={{ backgroundColor: '#34d399', borderColor: '#0e0e11' }}
          />
        </div>
        <div>
          <div
            className="text-[12.5px] font-bold mb-0.5"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            📦 v2.5 is live — 1,247 subscribers notified
          </div>
          <div
            className="text-[11px]"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            89% open rate · sent automatically on publish
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Frame definitions ───────────────────────────────────── */
const FRAMES = [
  {
    eyebrow: 'Built for developers who ship',
    headline: 'Write beautiful\nchangelogs in minutes.',
    subhead:
      'A rich-text editor built for release notes. Write, categorize, and publish on your own schedule — your team stays aligned effortlessly.',
    cta: 'Start Writing Free',
    Mockup: EditorMockup,
  },
  {
    eyebrow: 'Your users will actually love it',
    headline: 'A stunning public\nchangelog — automatically.',
    subhead:
      'Every release you publish instantly appears on a beautiful branded page. Your users can subscribe, bookmark, and share it.',
    cta: 'See a Live Example',
    Mockup: PublicPageMockup,
  },
  {
    eyebrow: 'Keep every user in the loop',
    headline: 'Every release, straight\nto their inbox.',
    subhead:
      'Subscribers get a beautiful email the moment you publish. No setup, no configuration — just write, publish, and let ChangelogHub handle the rest.',
    cta: 'Start for Free',
    Mockup: SubscriberMockup,
  },
];

/* ── Main ScrollHero ─────────────────────────────────────── */
function ScrollHero() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray('.hero-frame');

      // Entrance animation for frame 1 copy
      gsap.from('.hero-entrance-item', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });

      frames.forEach((frame, i) => {
        gsap.set(frame, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=240%',
          pin: pinRef.current,
          scrub: 2,
          ease: 'power2.inOut',
        },
      });

      tl.to(frames[0], { opacity: 0, y: -30, duration: 0.5 }, 0.5)
        .to(frames[1], { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .to(frames[1], { opacity: 0, y: -30, duration: 0.5 }, 1.2)
        .to(frames[2], { opacity: 1, y: 0, duration: 0.5 }, 1.4);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ height: '340vh' }}>
      <div
        ref={pinRef}
        className="h-screen flex flex-col items-center justify-center px-5 md:px-6 pt-20 relative overflow-hidden"
      >
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Noise texture */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.025]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          {/* Grid dots */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage:
                'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
            }}
          />
          {/* Blue glow orb — top left */}
          <div
            className="absolute rounded-full blur-[120px] opacity-30"
            style={{
              width: 600,
              height: 600,
              top: '-20%',
              left: '-10%',
              background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
            }}
          />
          {/* Violet glow orb — top right */}
          <div
            className="absolute rounded-full blur-[140px] opacity-20"
            style={{
              width: 500,
              height: 500,
              top: '-10%',
              right: '-5%',
              background: 'radial-gradient(circle, #6366f1, transparent 70%)',
            }}
          />
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 100% 70% at 50% -5%, rgba(59,130,246,0.12), transparent 65%)',
            }}
          />
        </div>

        {/* Frame stack */}
        <div className="relative w-full max-w-6xl">
          {FRAMES.map((frame, i) => (
            <div
              key={i}
              className={`hero-frame ${i === 0 ? 'relative' : 'absolute inset-0'} flex flex-col md:flex-row items-center gap-4 sm:gap-8 md:gap-16`}
            >
              {/* Left: copy */}
              <div className="flex-1 text-center md:text-left">
                <p
                  className={`text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase mb-2 sm:mb-4 ${i === 0 ? 'hero-entrance-item' : ''}`}
                  style={{ color: 'var(--color-primary)' }}
                >
                  {frame.eyebrow}
                </p>
                <h1
                  className={`text-[2rem] sm:text-4xl md:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-3 sm:mb-5 whitespace-pre-line ${i === 0 ? 'hero-entrance-item' : ''}`}
                  style={{
                    color: 'rgba(255,255,255,0.97)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {frame.headline}
                </h1>
                <p
                  className={`text-[14px] sm:text-[16.5px] leading-relaxed mb-5 sm:mb-8 max-w-md ${i === 0 ? 'hero-entrance-item' : ''}`}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {frame.subhead}
                </p>
                <div
                  className={`flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-3 ${i === 0 ? 'hero-entrance-item' : ''}`}
                >
                  <Link
                    to="/signup"
                    className="relative px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-[13.5px] sm:text-[14px] font-bold text-white no-underline overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                      boxShadow:
                        '0 0 30px rgba(99,102,241,0.45), 0 0 60px rgba(59,130,246,0.2)',
                    }}
                  >
                    <span className="relative z-10">{frame.cta} →</span>
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  </Link>
                  <Link
                    to="/login"
                    className="text-[13px] font-medium no-underline px-4 py-2.5 rounded-xl transition-all hover:bg-white/5"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    Sign in →
                  </Link>
                </div>
              </div>

              {/* Right: mockup — hidden on small mobile to prevent overflow */}
              <div className="hidden sm:flex flex-1 justify-center md:justify-end w-full max-w-lg">
                <div className="w-full">
                  <frame.Mockup />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollHero;
