import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Calendar, ChevronRight, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// ── Category config ─────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  feature: {
    label: 'Feature',
    icon: '✦',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    border: 'border-l-blue-500/50',
    dot: 'bg-blue-500',
  },
  improvement: {
    label: 'Improvement',
    icon: '↑',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    border: 'border-l-emerald-500/50',
    dot: 'bg-emerald-500',
  },
  bugfix: {
    label: 'Bugfix',
    icon: '⬡',
    badge: 'bg-red-500/10 text-red-300 border-red-500/20',
    border: 'border-l-red-500/50',
    dot: 'bg-red-500',
  },
  security: {
    label: 'Security',
    icon: '◈',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    border: 'border-l-amber-500/50',
    dot: 'bg-amber-500',
  },
};

const getCategoryConfig = (cat) =>
  CATEGORY_CONFIG[cat] || {
    label: cat,
    icon: '○',
    badge: 'bg-white/5 text-text-secondary border-white/10',
    border: 'border-l-white/10',
    dot: 'bg-white/30',
  };

function CategoryBadge({ category }) {
  const cfg = getCategoryConfig(category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border tracking-wide ${cfg.badge}`}
    >
      <span className="text-[10px]">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

function PublicChangelog() {
  const { subdomain } = useParams();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeModal, setSubscribeModal] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch(
          `/api/v1/public/${encodeURIComponent(subdomain)}/releases`
        );
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          toast.error(result.message || 'Failed to load changelog');
        }
      } catch (error) {
        toast.error('Network error: Could not reach the server');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (subdomain) fetchReleases();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080809] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
          <p className="text-text-muted text-sm">Loading changelog…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#080809] flex flex-col items-center justify-center p-4 gap-4">
        <Logo className="w-10 h-10 opacity-40" />
        <h1 className="text-xl font-semibold text-white">
          Workspace Not Found
        </h1>
        <p className="text-text-secondary text-sm">
          This changelog doesn't exist or is currently private.
        </p>
      </div>
    );
  }

  const { workspace, releases } = data;

  const filteredReleases = releases.filter((release) => {
    const matchesFilter = filter === 'all' || release.category === filter;
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', 'feature', 'improvement', 'bugfix', 'security'];

  return (
    <div className="min-h-screen bg-[#080809] text-text-primary font-sans selection:bg-primary/20">
      {/* ── Subscribe Modal ─────────────────────────────────── */}
      {subscribeModal && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setSubscribeModal(false)}
        >
          <div
            className="bg-[#111112] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Bell size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-[15px]">
                  Stay in the loop
                </h3>
                <p className="text-text-muted text-[12px]">
                  Get notified about new updates
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed! You'll hear from us soon.");
                setSubscribeModal(false);
                setEmail('');
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary hover:border-border-light hover:bg-white/10 rounded-xl px-4 py-3 text-[14px] text-text-primary outline-none transition-all placeholder-text-muted"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl text-sm transition-all"
              >
                Subscribe to Updates
              </button>
            </form>
            <p className="text-[11px] text-text-muted mt-4 text-center">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080809]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#161617] border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              {workspace.logo ? (
                <img
                  src={workspace.logo}
                  alt={workspace.name}
                  className="w-full h-full object-contain p-1.5"
                  loading="eager"
                  fetchPriority="high"
                  width="32"
                  height="32"
                />
              ) : (
                <Logo className="w-5 h-5" />
              )}
            </div>
            <span className="font-semibold text-[14px] text-white">
              {workspace.name}
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {['Updates', 'Docs', 'Support'].map((item) => (
              <button
                key={item}
                className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all active:scale-[0.98]"
              >
                {item}
              </button>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all active:scale-[0.98]"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Subscribe CTA */}
          <button
            onClick={() => setSubscribeModal(true)}
            className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full transition-all active:scale-[0.98]"
          >
            <Bell size={13} className="text-text-secondary" />
            Subscribe
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[11px] text-text-muted font-medium tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Product Updates
          </div>

          <h1
            className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5"
            style={{
              background:
                'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {workspace.name}
          </h1>

          <p className="text-[16px] text-text-secondary max-w-lg mx-auto leading-relaxed">
            {workspace.description ||
              `Everything new, improved, and fixed — delivered as we ship it.`}
          </p>
        </div>
      </div>

      {/* ── Filters & Search ────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#080809]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => {
              const cfg = cat !== 'all' ? getCategoryConfig(cat) : null;
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all border ${
                    isActive
                      ? 'bg-white text-black border-white'
                      : cat === 'all'
                        ? 'bg-white/5 text-slate-300 border-transparent hover:border-white/15 hover:text-white'
                        : `${cfg.badge} opacity-80 hover:opacity-100`
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative group">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary hover:border-border-light hover:bg-white/10 rounded-lg pl-8 pr-4 py-2 text-[13px] text-text-primary outline-none transition-all placeholder-text-muted w-[220px]"
            />
          </div>
        </div>
      </div>

      {/* ── Release Feed ────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {filteredReleases.length > 0 ? (
          <div className="space-y-0">
            {filteredReleases.map((release, idx) => {
              const cfg = getCategoryConfig(release.category);
              const dateLabel = new Date(
                release.publishedAt
              ).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const isLast = idx === filteredReleases.length - 1;

              return (
                <div
                  key={release._id}
                  className="grid md:grid-cols-[180px_1fr] gap-0 md:gap-10"
                >
                  {/* ── Left: Date column ── */}
                  <div className="hidden md:flex flex-col items-end pt-8 pr-0 relative">
                    {/* Timeline line */}
                    {!isLast && (
                      <div className="absolute right-[-20px] top-10 bottom-0 w-px bg-white/6" />
                    )}
                    {/* Date dot */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium text-text-muted tabular-nums">
                        {dateLabel}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 z-10 ${cfg.dot}`}
                      />
                    </div>
                  </div>

                  {/* ── Right: Card ── */}
                  <article
                    className={`mb-10 content-visibility-auto bg-[#0f0f10] border border-white/[0.07] border-l-2 ${cfg.border} rounded-xl overflow-hidden hover:border-white/12 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group`}
                  >
                    {/* Card header */}
                    <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <CategoryBadge category={release.category} />
                        {/* Mobile-only date */}
                        <span className="md:hidden text-[11px] text-text-muted flex items-center gap-1">
                          <Calendar size={11} />
                          {dateLabel}
                        </span>
                      </div>
                      {release.version && (
                        <span className="shrink-0 px-2 py-0.5 bg-white/5 border border-white/8 rounded-md text-[10px] font-mono text-text-muted tracking-wider">
                          {release.version.startsWith('v')
                            ? release.version
                            : `v${release.version}`}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="px-6 pb-6">
                      <h2 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-primary/90 transition-colors">
                        {release.title}
                      </h2>
                      <div
                        className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed
                          prose-headings:text-white prose-headings:font-semibold
                          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-white prose-code:text-primary/80
                          prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
                          prose-li:text-text-secondary prose-p:text-text-secondary"
                        dangerouslySetInnerHTML={{ __html: release.content }}
                      />

                      {/* Read more */}
                      <button className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-text-muted hover:text-white transition-colors group/btn">
                        Read more
                        <ChevronRight
                          size={13}
                          className="transition-transform group-hover/btn:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-white/8 rounded-2xl">
            <p className="text-text-secondary text-base mb-4">
              No updates match your filters.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="text-primary text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <button className="px-5 py-2 rounded-lg bg-white/5 border border-white/8 text-[13px] text-text-secondary hover:text-white hover:border-white/16 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
            ← Previous
          </button>
          <button className="px-5 py-2 rounded-lg bg-white/5 border border-white/8 text-[13px] text-text-secondary hover:text-white hover:border-white/16 transition-all">
            Next →
          </button>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mt-8 relative">
        {/* Gradient fade */}
        <div className="h-24 bg-linear-to-b from-transparent to-[#050506]" />

        <div className="bg-[#050506] border-t border-white/5 pt-16 pb-10">
          <div className="max-w-5xl mx-auto px-6">
            {/* Subscribe block */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-16">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Never miss an update
                </h3>
                <p className="text-text-muted text-sm">
                  Subscribe to get notified when we ship new features.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Subscribed successfully!');
                  setEmail('');
                }}
                className="flex gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 md:w-60 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-primary/40 transition-all placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 opacity-[0.55]">
                <Logo className="w-4 h-4" />
                <span className="text-[11px] text-white font-medium tracking-widest uppercase">
                  Powered by ChangelogHub
                </span>
              </div>
              <div className="flex items-center gap-6 text-[12px] text-slate-300">
                <button className="hover:text-white transition-colors">
                  Privacy
                </button>
                <button className="hover:text-white transition-colors">
                  Terms
                </button>
                <button className="hover:text-white transition-colors">
                  Unsubscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicChangelog;
