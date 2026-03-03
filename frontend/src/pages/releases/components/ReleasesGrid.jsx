import React from 'react';
import PropTypes from 'prop-types';

import { useAuth } from '../../../context/AuthContext';

/* ── Status config (same as table) ──────────────────────────────── */
const STATUS_CONFIG = {
  published: {
    dot: 'bg-emerald-400',
    text: 'rgb(52,211,153)',
    bg: 'rgba(16,185,129,0.12)',
    label: 'Published',
  },
  draft: {
    dot: 'bg-amber-400',
    text: 'rgba(255,255,255,0.5)',
    bg: 'rgba(255,255,255,0.06)',
    label: 'Draft',
  },
  archive: {
    dot: 'bg-gray-500',
    text: 'rgb(156,163,175)',
    bg: 'rgba(107,114,128,0.12)',
    label: 'Archive',
  },
};

function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .map((w) => w[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'
  );
}

function getHue(name = '') {
  const a = name.charCodeAt(0) ?? 65;
  const b = name.charCodeAt(name.length - 1) ?? 65;
  return (a * 37 + b * 13) % 360;
}

/* ── Release Card ────────────────────────────────────────────────── */
function ReleaseCard({ release, currentName, currentAvatar }) {
  const cfg = STATUS_CONFIG[release.status] ?? STATUS_CONFIG.draft;
  const authorName =
    release.createdBy?.name ??
    release.createdBy?.email?.split('@')[0] ??
    currentName;
  const authorAvatar =
    release.createdBy?.avatar ??
    release.createdBy?.profilePicture ??
    currentAvatar;

  const rawDate = release.publishedAt ?? release.createdAt;
  const date = rawDate
    ? new Date(rawDate).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    : '—';

  const snippet = stripHtml(release.content);

  return (
    <div
      className="flex flex-col rounded-xl border p-5 cursor-pointer hover:border-primary/30 transition-all group bg-opacity-80"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Top: status dot + badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold border"
          style={{
            backgroundColor: cfg.bg,
            color: cfg.text,
            borderColor: cfg.text + '33',
          }}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`} />
          {cfg.label}
        </span>
        <span
          className="text-[11px] font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {date}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-[15px] leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {release.title}
      </h3>

      {/* Snippet */}
      <p
        className="text-xs leading-relaxed line-clamp-3 flex-1 mb-4"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {snippet || 'No description provided.'}
      </p>

      {/* Footer: author */}
      <div
        className="flex items-center gap-2 pt-3 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
            style={{ backgroundColor: `hsl(${getHue(authorName)}, 55%, 38%)` }}
          >
            {getInitials(authorName)}
          </div>
        )}
        <span
          className="text-[12px] font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {authorName}
        </span>
      </div>
    </div>
  );
}

ReleaseCard.propTypes = {
  release: PropTypes.object.isRequired,
  currentName: PropTypes.string,
  currentAvatar: PropTypes.string,
};

/* ── Grid Container ──────────────────────────────────────────────── */
function ReleasesGrid({ releases, loading, error }) {
  const { user } = useAuth();
  const currentName =
    user?.name ?? user?.username ?? user?.email?.split('@')[0] ?? 'You';
  const currentAvatar =
    user?.avatar ?? user?.profilePicture ?? user?.avatarUrl ?? null;

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center gap-2.5 p-6">
        <div className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Loading releases…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-32 flex items-center justify-center p-6 text-red-400 text-sm font-medium">
        {error}
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div
        className="h-32 flex items-center justify-center p-6"
        style={{ color: 'var(--color-text-muted)' }}
      >
        No releases found.
      </div>
    );
  }

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {!loading &&
        releases.map((release) => (
          <ReleaseCard
            key={release._id}
            release={release}
            currentName={currentName}
            currentAvatar={currentAvatar}
          />
        ))}
    </div>
  );
}

ReleasesGrid.propTypes = {
  releases: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ReleasesGrid;
