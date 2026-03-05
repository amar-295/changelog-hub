import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Input from '../../../components/ui/Input';

function SearchBar() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialSearch);
  const isMounted = useRef(false);

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

  // Sync internal state if URL changes externally
  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Debounced search
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const handler = setTimeout(() => {
      const val = query.trim();
      if (val) {
        if (searchParams.get('search') !== val) {
          navigate(`/releases?search=${encodeURIComponent(val)}`);
        }
      } else {
        if (searchParams.has('search')) {
          navigate(`/releases`);
        }
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, navigate, searchParams]);

  return (
    <Input
      ref={searchInputRef}
      icon={Search}
      placeholder="Search..."
      type="text"
      className="w-56 h-9! py-1! text-[13px] bg-bg-elevated/50!"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
