import React from "react";
import PropTypes from "prop-types";
import { useTooltip } from "../../hooks/useTooltip";

function ToolbarButton({
    onClick,
    active,
    disabled,
    label,
    shortcut,
    children,
}) {
    const { isVisible, showTooltip, hideTooltip, hideAndSuppress } = useTooltip();

    const handleClick = () => {
        hideAndSuppress();
        onClick();
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => showTooltip(disabled)}
            onMouseLeave={hideTooltip}
        >
            <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClick}
                disabled={disabled}
                aria-label={label}
                aria-describedby={isVisible ? `tooltip-${label}` : undefined}
                className={`p-1.5 rounded-md transition-all text-[13px] flex items-center justify-center
          ${active
                        ? "text-white bg-white/15"
                        : "text-text-muted hover:text-white hover:bg-white/8"
                    }
          ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
            >
                {children}
            </button>

            {isVisible && (
                <div
                    id={`tooltip-${label}`}
                    role="tooltip"
                    className="absolute bottom-full left-1/2 mb-2.5 px-2.5 py-1.5 rounded-lg
            text-[11px] font-semibold whitespace-nowrap text-white
            pointer-events-none z-50 flex items-center gap-1.5 tooltip-visible"
                    style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        transform: "translateX(-50%)",
                    }}
                >
                    {label}
                    {shortcut && (
                        <span
                            className="text-[10px] font-bold px-1 py-0.5 rounded"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.55)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {shortcut}
                        </span>
                    )}
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid #1a1a1a",
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
};

export default ToolbarButton;
