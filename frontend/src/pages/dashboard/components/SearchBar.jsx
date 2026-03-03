import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../../../components/ui/Input';

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
    <Input
      ref={searchInputRef}
      icon={Search}
      placeholder="Search..."
      type="text"
      className="w-52 py-1.5 text-[13px]"
      rightIcon={
        <div
          className="flex items-center justify-center min-w-[20px] h-[20px] text-[11px] font-semibold rounded bg-bg-card text-text-muted"
          style={{
            boxShadow:
              '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border)',
          }}
        >
          /
        </div>
      }
    />
  );
}

export default SearchBar;
