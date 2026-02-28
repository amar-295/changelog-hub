import React, { useState, useEffect } from "react";
import Header from "../../pages/dashboard/Header";
import { releaseService } from "../../services/releaseService";
import { authService } from "../../services/authService";

const textPrimary = { color: "var(--color-text-primary)" };

function StatusBadge({ status }) {
  const styles = {
    published: {
      bg: "rgba(52, 211, 153, 0.1)",
      color: "#34d399",
      dot: "#34d399",
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
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      <span
        className="size-1.5 rounded-full mr-1.5"
        style={{ backgroundColor: s.dot }}
      ></span>
      {status}
    </span>
  );
}

function Releases() {
  const cardStyle = {
    backgroundColor: "var(--color-bg-card)",
    borderColor: "var(--color-border)",
  };
  const elevatedStyle = { backgroundColor: "var(--color-bg-elevated)" };
  const textPrimary = { color: "var(--color-text-primary)" };
  const textSecondary = { color: "var(--color-text-secondary)" };
  const textMuted = { color: "var(--color-text-muted)" };
  const borderStyle = { borderColor: "var(--color-border)" };
  const filterBtnStyle = {
    backgroundColor: "var(--color-bg-input)",
    borderColor: "var(--color-border)",
    color: "var(--color-text-secondary)",
  };

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        setLoading(true);
        const params = { page, limit: 10 };
        if (statusFilter) params.status = statusFilter;
        const response = await releaseService.getAllReleases(params);
        // Backend returns: response.data = { releases, pagination }
        setReleases(response.data?.releases || []);
        setPagination(response.data?.pagination || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReleases();
  }, [page, statusFilter]);

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h2
              className="text-3xl font-black tracking-tight"
              style={textPrimary}
            >
              Releases
            </h2>
            <p style={textSecondary}>
              Manage and publish your product updates.
            </p>
          </div>
          <button
            className="px-6 py-2.5 rounded-full text-white font-black text-[13px] tracking-widest uppercase transition-colors flex items-center gap-2 hover:opacity-90"
            style={{
              backgroundColor: "#0f9d58", // Match the vibrant green
            }}
          >
            <span className="material-symbols-outlined text-[20px] font-light">
              add
            </span>
            CREATE UPDATE
          </button>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 border"
          style={cardStyle}
        >
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover"
              style={filterBtnStyle}
            >
              Status: <span style={textPrimary}>All</span>
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover"
              style={filterBtnStyle}
            >
              Author: <span style={textPrimary}>All</span>
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover"
              style={filterBtnStyle}
            >
              Date Range: <span style={textPrimary}>Last 30 Days</span>
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-medium" style={textMuted}>
              Sorted by Date
            </span>
          </div>
        </div>

        {/* Releases Table */}
        <div
          className="rounded-xl border shadow-sm overflow-hidden"
          style={cardStyle}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={borderStyle}>
                <th className="py-4 px-6 w-12 text-center">
                  <input
                    className="rounded text-primary focus:ring-primary"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg-input)",
                    }}
                    type="checkbox"
                  />
                </th>
                <th
                  className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  style={textMuted}
                >
                  Title &amp; Description
                </th>
                <th
                  className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  style={textMuted}
                >
                  Status
                </th>
                <th
                  className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  style={textMuted}
                >
                  Date
                </th>
                <th
                  className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  style={textMuted}
                >
                  Author
                </th>
                <th className="py-4 px-6 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center"
                    style={textMuted}
                  >
                    Loading releases...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-red-400">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && releases.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center"
                    style={textMuted}
                  >
                    No releases yet. Create your first one!
                  </td>
                </tr>
              )}
              {releases.map((release) => (
                <tr
                  key={release._id}
                  className="border-b transition-colors hover:bg-bg-card-hover"
                  style={{ ...borderStyle, cursor: "pointer" }}
                >
                  <td className="py-5 px-6 text-center">
                    <input
                      className="rounded"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-bg-input)",
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold" style={textPrimary}>
                        {release.title}
                      </span>
                      <span
                        className="text-sm line-clamp-1"
                        style={textSecondary}
                      >
                        {release.content}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <StatusBadge status={release.status} />
                  </td>
                  <td className="py-5 px-6 text-sm" style={textSecondary}>
                    {new Date(release.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm font-medium" style={textPrimary}>
                      {release.version || "—"}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <button
                      className="hover:opacity-80 transition-colors"
                      style={textMuted}
                    >
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={textSecondary}>
            Showing {releases.length} of {pagination?.totalReleases ?? 0}{" "}
            results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors flex items-center gap-2 hover:bg-bg-card-hover disabled:opacity-40"
              style={{ ...cardStyle, ...textSecondary }}
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination || page >= pagination.totalPages}
              className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors flex items-center gap-2 hover:bg-bg-card-hover disabled:opacity-40"
              style={{ ...cardStyle, ...textSecondary }}
            >
              Next
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Releases;
