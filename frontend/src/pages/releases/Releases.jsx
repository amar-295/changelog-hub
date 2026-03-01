import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronDown,
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  ArrowUpRight,
  Bug,
  Shield,
} from "lucide-react";
import { releaseService } from "../../services/releaseService";
import CreateReleaseModal from "./CreateReleaseModal";

const textPrimary = { color: "var(--color-text-primary)" };

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
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
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

// Helper to strip HTML tags for plain-text preview in the list
function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function CategoryCell({ category }) {
  const categories = {
    feature: { icon: Sparkles, color: "text-blue-400", label: "Feature" },
    improvement: {
      icon: ArrowUpRight,
      color: "text-violet-400",
      label: "Improvement",
    },
    bugfix: { icon: Bug, color: "text-red-400", label: "Bugfix" },
    security: { icon: Shield, color: "text-amber-400", label: "Security" },
    other: { icon: MoreHorizontal, color: "text-gray-400", label: "Other" },
  };
  const c = categories[category] || categories.other;
  const Icon = c.icon;
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} strokeWidth={1.5} className={c.color} />
      <span
        className="text-xs font-semibold capitalize"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {c.label}
      </span>
    </div>
  );
}

function Releases() {
  const cardStyle = {
    backgroundColor: "var(--color-bg-card)",
    borderColor: "var(--color-border)",
  };
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        setLoading(true);
        const params = { page, limit: 10 };
        if (statusFilter) params.status = statusFilter;
        const response = await releaseService.getAllReleases(params);
        setReleases(response.data?.releases || []);
        setPagination(response.data?.pagination || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReleases();
  }, [page, statusFilter, refreshKey]);

  const ICON_SIZE = 16;
  const STROKE_WIDTH = 1.5;

  return (
    <>
      <CreateReleaseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
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
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 border"
          style={cardStyle}
        >
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover cursor-pointer"
              style={filterBtnStyle}
            >
              Status: <span style={textPrimary}>All</span>
              <ChevronDown size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover cursor-pointer"
              style={filterBtnStyle}
            >
              Category: <span style={textPrimary}>All</span>
              <ChevronDown size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors hover:bg-bg-card-hover cursor-pointer"
              style={filterBtnStyle}
            >
              Date Range: <span style={textPrimary}>Last 30 Days</span>
              <Calendar size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
            </button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={textMuted}
            >
              Sorted by Date
            </span>
            <div
              className="h-4 w-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 rounded-lg text-white font-semibold text-[13px] transition-all flex items-center gap-2 hover:opacity-90 active:scale-[0.95] shadow-sm cursor-pointer"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
            >
              <Plus size={16} strokeWidth={2} />
              New Release
            </button>
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
                <th className="py-4 px-6 w-12 text-center text-xs">
                  <input
                    className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary cursor-pointer"
                    type="checkbox"
                  />
                </th>
                <th
                  className="py-4 px-6 text-xs font-bold uppercase tracking-widest"
                  style={textMuted}
                >
                  Title &amp; Description
                </th>
                <th
                  className="py-4 px-6 text-xs font-bold uppercase tracking-widest"
                  style={textMuted}
                >
                  Status
                </th>
                <th
                  className="py-4 px-6 text-xs font-bold uppercase tracking-widest"
                  style={textMuted}
                >
                  Category
                </th>
                <th
                  className="py-4 px-6 text-xs font-bold uppercase tracking-widest"
                  style={textMuted}
                >
                  Date
                </th>
                <th
                  className="py-4 px-6 text-xs font-bold uppercase tracking-widest"
                  style={textMuted}
                >
                  Version
                </th>
                <th className="py-4 px-6 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      <span className="text-sm font-medium" style={textMuted}>
                        Loading releases...
                      </span>
                    </div>
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
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-50">
                      <Search size={40} strokeWidth={1} style={textMuted} />
                      <div className="text-center">
                        <p className="font-bold" style={textPrimary}>
                          No releases found
                        </p>
                        <p className="text-sm" style={textSecondary}>
                          Try adjusting your filters or create a new update.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {releases.map((release) => (
                <tr
                  key={release._id}
                  className="border-b last:border-0 transition-colors hover:bg-bg-card-hover"
                  style={{ ...borderStyle, cursor: "pointer" }}
                >
                  <td className="py-5 px-6 text-center">
                    <input
                      className="rounded border-gray-600 bg-gray-800 cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span
                        className="font-bold line-clamp-1"
                        style={textPrimary}
                      >
                        {release.title}
                      </span>
                      <span
                        className="text-sm line-clamp-1"
                        style={textSecondary}
                      >
                        {stripHtml(release.content)}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <StatusBadge status={release.status} />
                  </td>
                  <td className="py-5 px-6">
                    <CategoryCell category={release.category} />
                  </td>
                  <td
                    className="py-5 px-6 text-sm font-medium whitespace-nowrap"
                    style={textSecondary}
                  >
                    {new Date(release.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className="px-2 py-0.5 rounded bg-bg-elevated border border-border text-xs font-bold"
                      style={textPrimary}
                    >
                      {release.version || "—"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button
                      className="p-1 rounded hover:bg-bg-elevated transition-colors cursor-pointer"
                      style={textMuted}
                    >
                      <MoreHorizontal size={18} strokeWidth={STROKE_WIDTH} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pb-10">
          <p className="text-sm font-medium" style={textSecondary}>
            Showing <span style={textPrimary}>{releases.length}</span> of{" "}
            <span style={textPrimary}>{pagination?.totalReleases ?? 0}</span>{" "}
            results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-bold border rounded-lg transition-all flex items-center gap-2 hover:bg-bg-card-hover disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              style={{ ...cardStyle, ...textSecondary }}
            >
              <ChevronLeft size={16} strokeWidth={2} />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination || page >= pagination.totalPages}
              className="px-4 py-2 text-sm font-bold border rounded-lg transition-all flex items-center gap-2 hover:bg-bg-card-hover disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              style={{ ...cardStyle, ...textSecondary }}
            >
              Next
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Releases };
export default Releases;
