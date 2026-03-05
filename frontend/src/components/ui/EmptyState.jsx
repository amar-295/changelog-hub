import React from 'react';
import PropTypes from 'prop-types';

/**
 * Consistent empty/not-found state used across list views.
 *
 * @example
 * <EmptyState
 *   icon={Mail}
 *   title="No subscribers found"
 *   description="Share your public changelog to get started."
 *   action={<button>Create one</button>}
 * />
 */
function EmptyState({
  icon: Icon,
  title = 'Nothing found',
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-20 gap-3 ${className}`}
    >
      {Icon && (
        <div
          className="p-4 rounded-full"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: 'var(--color-primary)',
          }}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <div className="text-center">
        <p
          className="font-bold text-lg"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </p>
        {description && (
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default EmptyState;
