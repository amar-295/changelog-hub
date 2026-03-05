import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useTooltip } from '../../hooks/useTooltip';

/**
 * Lightweight tooltip component.
 * Wraps any element and shows a tooltip on hover.
 *
 * @example
 * <Tooltip text="Export as CSV">
 *   <button>Export</button>
 * </Tooltip>
 *
 * <Tooltip text="Expand Sidebar" position="right">
 *   <button>▶</button>
 * </Tooltip>
 */
function Tooltip({ children, text, position = 'top', usePortal = false }) {
  const { isVisible, showTooltip, hideTooltip } = useTooltip(250);
  const triggerRef = useRef(null);
  const [rect, setRect] = useState(null);

  const handleEnter = () => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
    showTooltip();
  };

  const tooltipStyle = {
    backgroundColor: 'var(--color-bg-tooltip)',
    border: '1px solid rgba(255,255,255,0.14)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'absolute top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'absolute right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'absolute left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default:
        return 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrow = () => {
    const base = 'absolute w-0 h-0';
    const border = '5px solid transparent';
    const fill = 'var(--color-bg-tooltip)';

    switch (position) {
      case 'bottom':
        return (
          <div
            className={`${base} bottom-full left-1/2 -translate-x-1/2`}
            style={{
              borderLeft: border,
              borderRight: border,
              borderBottom: `5px solid ${fill}`,
            }}
          />
        );
      case 'left':
        return (
          <div
            className={`${base} top-1/2 left-full -translate-y-1/2`}
            style={{
              borderTop: border,
              borderBottom: border,
              borderLeft: `5px solid ${fill}`,
            }}
          />
        );
      case 'right':
        return (
          <div
            className={`${base} top-1/2 right-full -translate-y-1/2`}
            style={{
              borderTop: border,
              borderBottom: border,
              borderRight: `5px solid ${fill}`,
            }}
          />
        );
      case 'top':
      default:
        return (
          <div
            className={`${base} top-full left-1/2 -translate-x-1/2`}
            style={{
              borderLeft: border,
              borderRight: border,
              borderTop: `5px solid ${fill}`,
            }}
          />
        );
    }
  };

  // Portal-based tooltip (for elements inside overflow:hidden containers)
  const portalTooltip =
    isVisible && usePortal && rect
      ? createPortal(
          <div
            className="fixed px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-99999"
            style={{
              ...tooltipStyle,
              top:
                position === 'bottom'
                  ? rect.bottom + 8
                  : position === 'top'
                    ? rect.top - 36
                    : rect.top + rect.height / 2,
              left:
                position === 'right'
                  ? rect.right + 12
                  : position === 'left'
                    ? rect.left - 12
                    : rect.left + rect.width / 2,
              transform:
                position === 'top' || position === 'bottom'
                  ? 'translateX(-50%)'
                  : 'translateY(-50%)',
            }}
          >
            {text}
          </div>,
          document.body
        )
      : null;

  // Inline tooltip
  const inlineTooltip = isVisible && !usePortal && (
    <div
      className={`${getPositionClasses()} px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-50`}
      style={tooltipStyle}
    >
      {text}
      {getArrow()}
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={hideTooltip}
    >
      {children}
      {inlineTooltip}
      {portalTooltip}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  usePortal: PropTypes.bool,
};

export default Tooltip;
