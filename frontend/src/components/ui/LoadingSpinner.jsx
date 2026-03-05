import React from 'react';
import PropTypes from 'prop-types';

/**
 * Consistent loading spinner used across all pages.
 *
 * @example
 * <LoadingSpinner />
 * <LoadingSpinner label="Loading releases…" size="lg" />
 */

const SIZE_MAP = {
  sm: 'w-4 h-4 border-[1.5px]',
  md: 'w-8 h-8 border-2',
  lg: 'w-10 h-10 border-2',
};

function LoadingSpinner({
  size = 'md',
  label,
  className = '',
  fullPage = false,
}) {
  const wrapperClass = fullPage
    ? `min-h-screen flex items-center justify-center ${className}`
    : `flex items-center justify-center ${className}`;

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={`rounded-full border-primary border-t-transparent animate-spin ${SIZE_MAP[size] || SIZE_MAP.md}`}
        />
        {label && (
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  className: PropTypes.string,
  fullPage: PropTypes.bool,
};

export default LoadingSpinner;
