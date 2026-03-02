import React from "react";
import PropTypes from "prop-types";

function StatusBadge({ status }) {
    const styles = {
        published: {
            bg: "rgba(59, 130, 246, 0.1)",
            color: "#60a5fa",
            dot: "#3b82f6",
        },
        draft: { bg: "rgba(148, 163, 184, 0.1)", color: "#94a3b8", dot: "#94a3b8" },
        archived: {
            bg: "rgba(251, 191, 36, 0.1)",
            color: "#fbbf24",
            dot: "#fbbf24",
        },
    };
    const s = styles[status] || styles.draft;

    return (
        <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
            style={{ backgroundColor: s.bg, color: s.color }}
        >
            <span
                className="size-1.5 rounded-full mr-2"
                style={{ backgroundColor: s.dot }}
            ></span>
            {status}
        </span>
    );
}

StatusBadge.propTypes = {
    status: PropTypes.oneOf(["published", "draft", "archived"]).isRequired,
};

export default StatusBadge;
