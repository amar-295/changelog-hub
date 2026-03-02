import React from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CategoryCell from "./CategoryCell";

// Helper to strip HTML tags for plain-text preview in the list
function stripHtml(html) {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}

function ReleasesTable({ releases, loading, error }) {
    const textPrimary = { color: "var(--color-text-primary)" };
    const textSecondary = { color: "var(--color-text-secondary)" };
    const textMuted = { color: "var(--color-text-muted)" };
    const borderStyle = { borderColor: "var(--color-border)" };

    return (
        <div
            className="rounded-2xl border shadow-sm overflow-hidden"
            style={borderStyle}
        >
            <table className="w-full text-sm text-left">
                <thead style={{ backgroundColor: "var(--color-bg-elevated)" }}>
                    <tr className="border-b transition-colors" style={borderStyle}>
                        <th
                            className="h-11 px-6 py-4 align-middle w-12 text-center"
                            style={borderStyle}
                        >
                            <input
                                type="checkbox"
                                className="size-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer accent-blue-500"
                                aria-label="Select all releases"
                            />
                        </th>
                        <th
                            className="h-11 px-6 py-4 align-middle font-bold text-xs uppercase tracking-widest"
                            style={textMuted}
                        >
                            Title
                        </th>
                        <th
                            className="h-11 px-6 py-4 align-middle font-bold text-xs uppercase tracking-widest"
                            style={textMuted}
                        >
                            Status
                        </th>
                        <th
                            className="h-11 px-6 py-4 align-middle font-bold text-xs uppercase tracking-widest"
                            style={textMuted}
                        >
                            Category
                        </th>
                        <th
                            className="h-11 px-6 py-4 align-middle font-bold text-xs uppercase tracking-widest"
                            style={textMuted}
                        >
                            Date
                        </th>
                        <th
                            className="h-11 px-6 py-4 align-middle w-16 text-center font-bold text-xs uppercase tracking-widest"
                            style={textMuted}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "var(--color-bg-card)" }}>
                    {loading && (
                        <tr>
                            <td colSpan="6" className="h-24 text-center">
                                <div className="flex justify-center items-center gap-2">
                                    <div className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                                    <span className="text-sm" style={textMuted}>
                                        Loading...
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td
                                colSpan="6"
                                className="h-24 text-center text-red-500 font-medium"
                            >
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && releases.length === 0 && (
                        <tr>
                            <td
                                colSpan="6"
                                className="h-24 text-center"
                                style={textMuted}
                            >
                                No releases found.
                            </td>
                        </tr>
                    )}
                    {releases.map((release) => (
                        <tr
                            key={release._id}
                            className="border-b last:border-0 transition-colors hover:brightness-110 group"
                            style={{ ...borderStyle, cursor: "pointer" }}
                        >
                            <td
                                className="px-6 py-4 align-middle text-center"
                                style={borderStyle}
                            >
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer accent-blue-500"
                                    aria-label={`Select release ${release.title}`}
                                />
                            </td>
                            <td className="px-6 py-4 align-middle max-w-[300px]">
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-bold truncate" style={textPrimary}>
                                        {release.title}
                                    </span>
                                    <span
                                        className="text-xs truncate font-medium"
                                        style={textSecondary}
                                    >
                                        {stripHtml(release.content)}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 align-middle">
                                <StatusBadge status={release.status} />
                            </td>
                            <td className="px-6 py-4 align-middle">
                                <CategoryCell category={release.category} />
                            </td>
                            <td
                                className="px-6 py-4 align-middle text-sm font-medium"
                                style={textSecondary}
                            >
                                {new Date(release.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="px-6 py-4 align-middle text-center">
                                <button
                                    className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 cursor-pointer"
                                    style={textMuted}
                                    aria-label="Row actions"
                                >
                                    <MoreVertical size={18} strokeWidth={1.5} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReleasesTable.propTypes = {
    releases: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default ReleasesTable;
