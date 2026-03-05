/**
 * Shared configuration objects for release status and categories.
 * Used across ReleasesTable, ReleasesGrid, PublicChangelog, and other components.
 */

// ── Status configuration (dashboard views) ──────────────────────────────────
export const STATUS_CONFIG = {
  published: {
    dot: 'bg-emerald-400',
    bg: 'rgba(16,185,129,0.12)',
    text: 'rgb(52,211,153)',
    label: 'Published',
  },
  draft: {
    dot: 'bg-amber-400',
    bg: 'rgba(255,255,255,0.06)',
    text: 'rgba(255,255,255,0.5)',
    label: 'Draft',
  },
  archive: {
    dot: 'bg-gray-500',
    bg: 'rgba(107,114,128,0.12)',
    text: 'rgb(156,163,175)',
    label: 'Archive',
  },
};

/**
 * Returns the status config for a given status string, falling back to draft.
 */
export const getStatusConfig = (status) =>
  STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;

// ── Category configuration (public changelog views) ─────────────────────────
export const CATEGORY_CONFIG = {
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

const DEFAULT_CATEGORY = {
  label: '',
  icon: '○',
  badge: 'bg-white/5 text-text-secondary border-white/10',
  border: 'border-l-white/10',
  dot: 'bg-white/30',
};

/**
 * Returns the category config for a given category string, falling back to a neutral default.
 */
export const getCategoryConfig = (cat) =>
  CATEGORY_CONFIG[cat] || { ...DEFAULT_CATEGORY, label: cat };

/** All available filter categories (including "all"). */
export const FILTER_CATEGORIES = [
  'all',
  'feature',
  'improvement',
  'bugfix',
  'security',
];
