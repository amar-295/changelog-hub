import React from 'react';
import PropTypes from 'prop-types';

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  shortcut,
  children,
  tooltipAlign = 'center',
}) {
  const [isTipVisible, setIsTipVisible] = React.useState(false);

  const handleClick = () => {
    setIsTipVisible(false);
    onClick();
  };

  const alignStyles = {
    center: 'left-1/2 -translate-x-1/2',
    left: 'left-0',
    right: 'right-0',
  };

  const arrowStyles = {
    center: 'left-1/2 -translate-x-1/2',
    left: 'left-3',
    right: 'right-3',
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsTipVisible(true)}
      onMouseLeave={() => setIsTipVisible(false)}
    >
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleClick}
        disabled={disabled}
        aria-label={label}
        className={`p-1.5 rounded-md transition-all text-[13px] flex items-center justify-center
          ${
            active
              ? 'text-white bg-white/15'
              : 'text-text-muted hover:text-white hover:bg-white/8'
          }
          ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {children}
      </button>

      {isTipVisible && (
        <div
          role="tooltip"
          className={`absolute top-full mt-2.5 px-2.5 py-1.5 rounded-lg
            text-[11px] font-semibold whitespace-nowrap text-white
            pointer-events-none z-50 flex items-center gap-1.5 ${alignStyles[tooltipAlign]}`}
          style={{
            backgroundColor: 'var(--color-bg-tooltip)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
          }}
        >
          {label}
          {shortcut && (
            <span
              className="text-[10px] font-bold px-1 py-0.5 rounded"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.02em',
              }}
            >
              {shortcut}
            </span>
          )}
          <div
            className={`absolute bottom-full w-0 h-0 ${arrowStyles[tooltipAlign]}`}
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid var(--color-bg-tooltip)',
            }}
          />
        </div>
      )}
    </div>
  );
}

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  shortcut: PropTypes.string,
  children: PropTypes.node.isRequired,
  tooltipAlign: PropTypes.oneOf(['center', 'left', 'right']),
};

export default ToolbarButton;
