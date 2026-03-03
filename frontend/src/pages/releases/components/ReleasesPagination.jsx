import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LIMIT = 10;

function ReleasesPagination({ pagination, page, onPageChange }) {
  const total = pagination?.totalReleases ?? 0;
  const start = total > 0 ? (page - 1) * LIMIT + 1 : 0;
  const end = total > 0 ? Math.min(page * LIMIT, total) : 0;

  const canPrev = page > 1;
  const canNext = !!pagination && page < pagination.totalPages;

  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <span
        className="text-[13px]"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {total > 0
          ? `Showing ${start} to ${end} of ${total} release${total !== 1 ? 's' : ''}`
          : 'No releases to show'}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={!canPrev}
          aria-label="Previous page"
          className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:bg-white/12 hover:border-white/25 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            borderColor: 'rgba(255,255,255,0.18)',
            color: 'var(--color-text-primary)',
          }}
        >
          <ChevronLeft size={15} strokeWidth={1.75} />
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
          className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:bg-white/12 hover:border-white/25 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            borderColor: 'rgba(255,255,255,0.18)',
            color: 'var(--color-text-primary)',
          }}
        >
          <ChevronRight size={15} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

ReleasesPagination.propTypes = {
  pagination: PropTypes.shape({
    totalReleases: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ReleasesPagination;
