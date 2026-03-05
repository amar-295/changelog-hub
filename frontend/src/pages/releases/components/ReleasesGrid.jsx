/**
 * @module ReleasesGrid
 * Card/grid view for the releases list. Each card shows status, date,
 * a content snippet, and an action menu (edit / delete / publish toggle).
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/context/AuthContext';
import { Edit, Trash2, Send, Archive } from 'lucide-react';
import { getStatusConfig } from '@/config';
import {
  stripHtml,
  getInitials,
  getHue,
  formatDate,
} from '../../../utils/format';

/* ── Release Card ────────────────────────────────────────────────── */
function ReleaseCard({
  release,
  currentName,
  currentAvatar,
  onEdit,
  onDelete,
  onPublishToggle,
}) {
  const statusStyle = getStatusConfig(release.status);
  const authorName =
    release.createdBy?.name ??
    release.createdBy?.email?.split('@')[0] ??
    currentName;
  const authorAvatar =
    release.createdBy?.avatar ??
    release.createdBy?.profilePicture ??
    currentAvatar;

  const rawDate = release.publishedAt ?? release.createdAt;
  const displayDate = formatDate(rawDate);
  const contentSnippet = stripHtml(release.content);

  return (
    <div
      className="flex flex-col relative rounded-xl border p-5 cursor-pointer hover:border-primary/30 transition-all group bg-opacity-80 mt-2"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      onClick={() => onEdit(release)}
    >
      {/* Actions Overlay */}
      <div
        className="absolute -top-3 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-card/90 backdrop-blur-sm p-1 rounded-lg border shadow-xl z-10"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(release);
          }}
          className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-primary transition-colors"
          title="Edit Release"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPublishToggle(release);
          }}
          className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-primary transition-colors"
          title={release.status === 'published' ? 'Unpublish' : 'Publish'}
        >
          {release.status === 'published' ? (
            <Archive size={14} />
          ) : (
            <Send size={14} />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(release);
          }}
          className="p-1.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {/* Top: status dot + badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold border"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            borderColor: statusStyle.text + '33',
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusStyle.dot}`}
          />
          {statusStyle.label}
        </span>
        <span
          className="text-[11px] font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {displayDate}
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
        {contentSnippet || 'No description provided.'}
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPublishToggle: PropTypes.func.isRequired,
};

/* ── Grid Container ──────────────────────────────────────────────── */
function ReleasesGrid({
  releases,
  loading,
  error,
  onEdit,
  onDelete,
  onPublishToggle,
}) {
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
            onEdit={onEdit}
            onDelete={onDelete}
            onPublishToggle={onPublishToggle}
          />
        ))}
    </div>
  );
}

ReleasesGrid.propTypes = {
  releases: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPublishToggle: PropTypes.func.isRequired,
};

export default ReleasesGrid;
