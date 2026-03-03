import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key === '/' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA' &&
        !e.target.isContentEditable
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <Search
        size={15}
        strokeWidth={1.5}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--color-text-muted)' }}
      />
      <input
        ref={searchInputRef}
        className="w-52 pl-9 pr-14 py-1.5 rounded-lg text-[13px] outline-none placeholder:text-text-muted bg-bg-input text-text-primary border border-transparent focus:border-primary focus:ring-1 focus:ring-primary hover:border-border-light hover:bg-white/10 transition-all"
        placeholder="Search..."
        type="text"
      />
      <div
        className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[20px] h-[20px] text-[11px] font-semibold rounded"
        style={{
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-card)',
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
          border: '1px solid var(--color-border)',
        }}
      >
        /
      </div>
    </div>
  );
}

export default SearchBar;
