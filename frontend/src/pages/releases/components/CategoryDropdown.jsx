import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Bug,
  Shield,
  MoreHorizontal,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'feature', label: 'Feature', icon: Sparkles, color: 'text-blue-400' },
  {
    id: 'improvement',
    label: 'Improvement',
    icon: ArrowUpRight,
    color: 'text-violet-400',
  },
  { id: 'bugfix', label: 'Bugfix', icon: Bug, color: 'text-red-400' },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    color: 'text-amber-400',
  },
  {
    id: 'other',
    label: 'Other',
    icon: MoreHorizontal,
    color: 'text-gray-400',
  },
];

function CategoryDropdown({ value, onChange, inputStyle }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const active = CATEGORIES.find((c) => c.id === value) || CATEGORIES[0];
  const ActiveIcon = active.icon;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full px-4 py-2.5 rounded-lg border text-sm font-medium flex items-center justify-between transition-all hover:border-primary-dark/40 cursor-pointer text-left"
        style={inputStyle}
      >
        <div className="flex items-center gap-2">
          <ActiveIcon size={16} strokeWidth={1.5} className={active.color} />
          <span className="capitalize">{active.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-text-muted)' }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 py-1.5 rounded-lg border shadow-xl z-50 animate-dropdown overflow-hidden"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = value === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChange(c.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer capitalize ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-primary/5 hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className={isActive ? 'text-white' : c.color}
                  />
                  <span>{c.label}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

CategoryDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
};

export default CategoryDropdown;
