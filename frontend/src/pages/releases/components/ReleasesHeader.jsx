import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import {
  Download,
  Plus,
  LayoutGrid,
  List,
  CalendarDays,
} from 'lucide-react';
import { IconBtn } from './IconBtn';

/* ── Constants ───────────────────────────────────────────────────── */
const TABS = [
  { label: 'All', value: '' },
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'draft' },
  { label: 'Archive', value: 'archived' },
];

const TITLES = {
  '': 'All Releases',
  published: 'Published',
  draft: 'Drafts',
  archived: 'Archive',
};

/* ── Small tooltip (reused locally) ─────────────────────────────── */
function Tip({ children }) {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg
        text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-50"
      style={{
        backgroundColor: 'var(--color-bg-tooltip)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
      }}
    >
      {children}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '5px solid var(--color-bg-tooltip)',
        }}
      />
    </div>
  );
}
Tip.propTypes = { children: PropTypes.node };

/* ── Date filter dropdown ────────────────────────────────────────── */
function FilterDropdown({ dateFilter, onChange, onClose }) {
  const [local, setLocal] = useState(dateFilter);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const inputCls =
    'w-full h-8 px-3 rounded-lg border text-[12.5px] bg-transparent outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer';
  const inputSty = {
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  };

  const hasFilter = local.from || local.to;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-72 rounded-xl border shadow-2xl z-50 p-4 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[12px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Filter by Date
        </span>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              const cleared = { from: '', to: '' };
              setLocal(cleared);
              onChange(cleared);
            }}
            className="text-[11px] text-primary hover:underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-[11.5px] font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          From
        </label>
        <input
          type="date"
          value={local.from}
          onChange={(e) => setLocal((p) => ({ ...p, from: e.target.value }))}
          className={inputCls}
          style={inputSty}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-[11.5px] font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          To
        </label>
        <input
          type="date"
          value={local.to}
          onChange={(e) => setLocal((p) => ({ ...p, to: e.target.value }))}
          className={inputCls}
          style={inputSty}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 h-8 rounded-lg border text-[12.5px] font-medium transition-all hover:bg-white/5 cursor-pointer"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onChange(local);
            onClose();
          }}
          className="flex-1 h-8 rounded-lg text-[12.5px] font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
FilterDropdown.propTypes = {
  dateFilter: PropTypes.shape({ from: PropTypes.string, to: PropTypes.string })
    .isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

/* ── Main Header ─────────────────────────────────────────────────── */
function ReleasesHeader({
  statusFilter = '',
  viewMode = 'table',
  onViewModeChange,
  dateFilter = { from: '', to: '' },
  onDateFilterChange,
}) {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportTip, setExportTip] = useState(false);

  const title = TITLES[statusFilter] ?? 'All Releases';
  const hasDate = dateFilter.from || dateFilter.to;

  const go = (value) =>
    navigate(value ? `/releases?status=${value}` : '/releases');

  return (
    <div>
      {/* Row 1 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Monitor and manage your product lifecycle updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="relative">
            <div className="relative" style={{ display: 'inline-flex' }}>
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className={`h-9 px-4 rounded-lg border text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  hasDate || filterOpen
                    ? 'border-primary/50 text-primary bg-primary/8'
                    : 'hover:bg-white/12 hover:border-white/25 text-text-primary'
                }`}
                style={{
                  borderColor:
                    hasDate || filterOpen ? undefined : 'var(--color-border)',
                }}
              >
                <CalendarDays size={14} strokeWidth={1.75} />
                Filter
                {hasDate && (
                  <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            </div>
            {filterOpen && (
              <FilterDropdown
                dateFilter={dateFilter}
                onChange={onDateFilterChange}
                onClose={() => setFilterOpen(false)}
              />
            )}
          </div>

          {/* Export */}
          <div
            className="relative"
            onMouseEnter={() => setExportTip(true)}
            onMouseLeave={() => setExportTip(false)}
          >
            <button
              type="button"
              className="h-9 px-4 rounded-lg border text-[13px] font-semibold flex items-center gap-2 transition-all hover:bg-white/12 hover:border-white/25 text-text-primary cursor-pointer"
              style={{
                borderColor: 'var(--color-border)',
              }}
            >
              <Download size={14} strokeWidth={1.75} />
              Export
            </button>
            {exportTip && <Tip>Export as CSV</Tip>}
          </div>

          {/* Table / Grid toggle */}
          <div className="flex items-center gap-1">
            <IconBtn
              icon={List}
              label="Table view"
              active={viewMode === 'table'}
              onClick={() => onViewModeChange?.('table')}
            />
            <IconBtn
              icon={LayoutGrid}
              label="Grid view"
              active={viewMode === 'grid'}
              onClick={() => onViewModeChange?.('grid')}
            />
          </div>

          {/* New Release */}
          <Link
            to="/releases/new"
            className="btn btn-primary h-9 px-4 inline-flex items-center gap-1.5 no-underline text-[13px] font-semibold"
          >
            <Plus size={15} strokeWidth={2.5} />
            New Release
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {TABS.map((tab) => {
          const isActive = statusFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => go(tab.value)}
              className={`px-4 py-2.5 text-[13.5px] font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

ReleasesHeader.propTypes = {
  statusFilter: PropTypes.string,
  viewMode: PropTypes.oneOf(['table', 'grid']),
  onViewModeChange: PropTypes.func,
  dateFilter: PropTypes.shape({ from: PropTypes.string, to: PropTypes.string }),
  onDateFilterChange: PropTypes.func,
};

export default ReleasesHeader;
