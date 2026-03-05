import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import Input from '../../../components/ui/Input';
import {
  getCategoryConfig,
  FILTER_CATEGORIES,
} from '../../../config/releaseConfig';

/**
 * Sticky filter bar with category pills and search input.
 */
function PublicFilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="sticky top-16 z-40 bg-[#080809]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Category pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_CATEGORIES.map((cat) => {
            const categoryStyle = cat !== 'all' ? getCategoryConfig(cat) : null;
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all border ${
                  isActive
                    ? 'bg-white text-black border-white'
                    : cat === 'all'
                      ? 'bg-white/5 text-slate-300 border-transparent hover:border-white/15 hover:text-white'
                      : `${categoryStyle.badge} opacity-80 hover:opacity-100`
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="w-[220px]">
          <Input
            icon={Search}
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={onSearchChange}
            className="py-2 text-[13px]"
          />
        </div>
      </div>
    </div>
  );
}

PublicFilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default PublicFilterBar;
