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
  const textPrimary = { color: "var(--color-text-primary)" };
  const textSecondary = { color: "var(--color-text-secondary)" };
  const textMuted = { color: "var(--color-text-muted)" };
  const borderStyle = { borderColor: "var(--color-border)" };

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [statusFilter] = useState("");
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
      <div className="p-8 max-w-[1200px] mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1.5 mb-8">
          <h2 className="text-2xl font-bold tracking-tight" style={textPrimary}>
            Releases
          </h2>
          <p className="text-sm" style={textSecondary}>
            Manage and publish your product updates.
          </p>
        </div>

        {/* Shadcn-Style Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-72">
              <Search
                className="absolute left-2.5 top-2.5 h-4 w-4"
                style={textMuted}
              />
              <input
                type="text"
                placeholder="Filter releases..."
                className="h-9 w-full rounded-md border bg-transparent pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                style={{ ...borderStyle, ...textPrimary }}
              />
            </div>
            <button
              className="h-9 border border-dashed px-3 flex items-center gap-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
              style={{
                ...borderStyle,
                ...textSecondary,
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <Plus size={14} style={textMuted} />
              Status
              <div
                className="h-4 w-px bg-border mx-1"
                style={{ backgroundColor: "var(--color-border)" }}
              ></div>
              <span className="bg-white/10 px-1 rounded text-xs">All</span>
            </button>
            <button
              className="h-9 border border-dashed px-3 flex items-center gap-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
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
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-9 px-4 flex items-center gap-2 rounded-md text-sm font-medium text-white shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Plus size={16} strokeWidth={2} />
            New Release
          </button>
        </div>

        {/* Shadcn-Style Table Container */}
        <div
          className="rounded-lg border shadow-sm overflow-hidden"
          style={borderStyle}
        >
          <table className="w-full text-sm text-left">
            <thead style={{ backgroundColor: "var(--color-bg-card)" }}>
              <tr
                className="border-b transition-colors hover:bg-white/2"
                style={borderStyle}
              >
                <th
                  className="h-11 px-4 align-middle w-12 text-center border-r"
                  style={borderStyle}
                >
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer accent-blue-500"
                    aria-label="Select all releases"
                  />
                </th>
                <th
                  className="h-11 px-4 align-middle font-medium"
                  style={textMuted}
                >
                  Title
                </th>
                <th
                  className="h-11 px-4 align-middle font-medium"
                  style={textMuted}
                >
                  Status
                </th>
                <th
                  className="h-11 px-4 align-middle font-medium"
                  style={textMuted}
                >
                  Category
                </th>
                <th
                  className="h-11 px-4 align-middle font-medium"
                  style={textMuted}
                >
                  Date
                </th>
                <th
                  className="h-11 px-4 align-middle w-16 text-center font-medium"
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
                  className="border-b last:border-0 transition-colors hover:bg-white/3 group"
                  style={{ ...borderStyle, cursor: "pointer" }}
                >
                  <td
                    className="p-4 align-middle text-center border-r"
                    style={borderStyle}
                  >
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer accent-blue-500"
                      aria-label={`Select release ${release.title}`}
                    />
                  </td>
                  <td className="p-4 align-middle max-w-[300px]">
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="font-medium truncate"
                        style={textPrimary}
                      >
                        {release.title}
                      </span>
                      <span className="text-xs truncate" style={textSecondary}>
                        {stripHtml(release.content)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <StatusBadge status={release.status} />
                  </td>
                  <td className="p-4 align-middle">
                    <CategoryCell category={release.category} />
                  </td>
                  <td
                    className="p-4 align-middle text-sm"
                    style={textSecondary}
                  >
                    {new Date(release.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 align-middle text-center">
                    <button
                      className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 cursor-pointer"
                      style={textMuted}
                      aria-label="Row actions"
                    >
                      <MoreHorizontal size={16} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shadcn-Style Pagination */}
        <div className="flex items-center justify-between pt-4 pb-10">
          <div className="text-sm" style={textMuted}>
            {releases.length} of {pagination?.totalReleases ?? 0} row(s) shown.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 px-3 text-sm font-medium border rounded-md transition-all hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              style={{
                ...borderStyle,
                ...textPrimary,
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination || page >= pagination.totalPages}
              className="h-8 px-3 text-sm font-medium border rounded-md transition-all hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
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
      </div>
    </>
  );
}

export { Releases };
export default Releases;
