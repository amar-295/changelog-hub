import React from "react";
import PropTypes from "prop-types";

function ReleasesPagination({ releases, pagination, page, onPageChange }) {
    const textMuted = { color: "var(--color-text-muted)" };
    const textPrimary = { color: "var(--color-text-primary)" };
    const borderStyle = { borderColor: "var(--color-border)" };

    return (
        <div className="flex items-center justify-between pt-4 pb-10">
            <div className="text-sm" style={textMuted}>
                {releases.length} of {pagination?.totalReleases ?? 0} row(s) shown.
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="h-8 px-3 text-sm font-medium border rounded-lg transition-all hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    style={{
                        ...borderStyle,
                        ...textPrimary,
                        backgroundColor: "var(--color-bg-card)",
                    }}
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={!pagination || page >= pagination.totalPages}
                    className="h-8 px-3 text-sm font-medium border rounded-lg transition-all hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    style={{
                        ...borderStyle,
                        ...textPrimary,
                        backgroundColor: "var(--color-bg-card)",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

ReleasesPagination.propTypes = {
    releases: PropTypes.array.isRequired,
    pagination: PropTypes.shape({
        totalReleases: PropTypes.number,
        totalPages: PropTypes.number,
    }),
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ReleasesPagination;
