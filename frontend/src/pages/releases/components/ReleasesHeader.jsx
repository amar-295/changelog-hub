import React from "react";
import PropTypes from "prop-types";
import { Plus, Search } from "lucide-react";

function ReleasesHeader({ onCreateClick }) {
    const textPrimary = { color: "var(--color-text-primary)" };
    const textSecondary = { color: "var(--color-text-secondary)" };
    const textMuted = { color: "var(--color-text-muted)" };
    const borderStyle = { borderColor: "var(--color-border)" };

    return (
        <div>
            {/* Page Title */}
            <div className="flex flex-col gap-1.5 mb-8">
                <h2
                    className="text-2xl font-bold tracking-tight"
                    style={textPrimary}
                >
                    Releases
                </h2>
                <p className="text-sm" style={textSecondary}>
                    Manage and publish your product updates.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex flex-1 items-center gap-2">
                    {/* Search */}
                    <div className="relative w-72">
                        <Search
                            className="absolute left-2.5 top-2.5 h-4 w-4"
                            style={textMuted}
                        />
                        <input
                            type="text"
                            placeholder="Filter releases..."
                            className="h-9 w-full rounded-lg border bg-transparent pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                            style={{ ...borderStyle, ...textPrimary }}
                        />
                    </div>

                    {/* Status filter */}
                    <button
                        className="h-9 border border-dashed px-3 flex items-center gap-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
                        style={{
                            ...borderStyle,
                            ...textSecondary,
                            backgroundColor: "var(--color-bg-card)",
                        }}
                    >
                        <Plus size={14} style={textMuted} />
                        Status
                        <div
                            className="h-4 w-px mx-1"
                            style={{ backgroundColor: "var(--color-border)" }}
                        />
                        <span className="bg-white/10 px-1 rounded text-xs">All</span>
                    </button>

                    {/* Category filter */}
                    <button
                        className="h-9 border border-dashed px-3 flex items-center gap-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
                        style={{
                            ...borderStyle,
                            ...textSecondary,
                            backgroundColor: "var(--color-bg-card)",
                        }}
                    >
                        <Plus size={14} style={textMuted} />
                        Category
                    </button>
                </div>

                {/* New Release button */}
                <button
                    onClick={onCreateClick}
                    className="h-9 px-4 flex items-center gap-2 rounded-lg text-sm font-medium text-white shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    <Plus size={16} strokeWidth={2} />
                    New Release
                </button>
            </div>
        </div>
    );
}

ReleasesHeader.propTypes = {
    onCreateClick: PropTypes.func.isRequired,
};

export default ReleasesHeader;
