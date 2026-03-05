/**
 * @module PublicChangelog
 * Public-facing changelog page accessible without authentication.
 * Acts as a composition root: delegates all data fetching to `usePublicChangelog`
 * and renders sub-components (PublicHeader, PublicHero, PublicFilterBar, etc.).
 * Route: /:subdomain
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getCategoryConfig } from '../../config/releaseConfig';

import { usePublicChangelog } from './hooks/usePublicChangelog';
import SubscribeModal from './components/SubscribeModal';
import PublicHeader from './components/PublicHeader';
import PublicHero from './components/PublicHero';
import PublicFilterBar from './components/PublicFilterBar';
import PublicFooter from './components/PublicFooter';
import CategoryBadge from './components/CategoryBadge';

function PublicChangelog() {
  const { subdomain } = useParams();
  const { isAuthenticated } = useAuth();

  const {
    workspace,
    filteredReleases,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    email,
    setEmail,
    subscribeModal,
    setSubscribeModal,
    isSubscribing,
    handleSubscribe,
  } = usePublicChangelog(subdomain);

  // ── Loading state ─────────────────────────────────────────────────
  if (loading) {
    return (
      <LoadingSpinner
        label="Loading changelog…"
        className="min-h-screen bg-[#080809]"
        fullPage
      />
    );
  }

  // ── Not found ─────────────────────────────────────────────────────
  if (!workspace) {
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

  return (
    <div className="min-h-screen bg-[#080809] text-text-primary font-sans selection:bg-primary/20">
      {/* Subscribe Modal */}
      {subscribeModal && (
        <SubscribeModal
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          onSubmit={handleSubscribe}
          onClose={() => setSubscribeModal(false)}
          isSubscribing={isSubscribing}
        />
      )}

      <PublicHeader
        workspace={workspace}
        isAuthenticated={isAuthenticated}
        onSubscribeClick={() => setSubscribeModal(true)}
      />

      <PublicHero workspace={workspace} />

      <PublicFilterBar
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ── Release Feed ──────────────────────────────────────────── */}
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
                  {/* Left: Date column */}
                  <div className="hidden md:flex flex-col items-end pt-8 pr-0 relative">
                    {!isLast && (
                      <div className="absolute right-[-20px] top-10 bottom-0 w-px bg-white/6" />
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium text-text-muted tabular-nums">
                        {dateLabel}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 z-10 ${cfg.dot}`}
                      />
                    </div>
                  </div>

                  {/* Right: Card */}
                  <article
                    className={`mb-10 content-visibility-auto bg-[#0f0f10] border border-white/[0.07] border-l-2 ${cfg.border} rounded-xl overflow-hidden hover:border-white/12 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group`}
                  >
                    {/* Card header */}
                    <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <CategoryBadge category={release.category} />
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

      <PublicFooter
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubscribe={handleSubscribe}
        isSubscribing={isSubscribing}
      />
    </div>
  );
}

export default PublicChangelog;
