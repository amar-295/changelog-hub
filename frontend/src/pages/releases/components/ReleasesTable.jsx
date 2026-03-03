import React from "react";
import PropTypes from "prop-types";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

/* ── Status config ───────────────────────────────────────────────── */
const STATUS_CONFIG = {
  published: {
    dot: "bg-emerald-400",
    bg: "rgba(16,185,129,0.12)",
    text: "rgb(52,211,153)",
    label: "Published",
  },
  draft: {
    dot: "bg-amber-400",
    bg: "rgba(255,255,255,0.06)",
    text: "rgba(255,255,255,0.5)",
    label: "Draft",
  },
  archive: {
    dot: "bg-gray-500",
    bg: "rgba(107,114,128,0.12)",
    text: "rgb(156,163,175)",
    label: "Archive",
  },
};

/* ── Helpers ─────────────────────────────────────────────────────── */
function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .map((w) => w[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

function getHue(name = "") {
  const a = name.charCodeAt(0) ?? 65;
  const b = name.charCodeAt(name.length - 1) ?? 65;
  return (a * 37 + b * 13) % 360;
}

/* ── Author Cell ─────────────────────────────────────────────────── */
function AuthorCell({ name, avatarUrl }) {
  return (
    <div className="flex items-center gap-2.5">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-white/10"
        />
      ) : (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: `hsl(${getHue(name)}, 55%, 38%)` }}
        >
          {getInitials(name)}
        </div>
      )}
      <span
        className="text-[13px] font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {name}
      </span>
    </div>
  );
}
AuthorCell.propTypes = { name: PropTypes.string, avatarUrl: PropTypes.string };

/* ── Row action menu ─────────────────────────────────────────────── */
function RowActions() {
  return (
    <button
      className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
      style={{ color: "var(--color-text-secondary)" }}
      aria-label="Row actions"
    >
      <MoreHorizontal size={16} strokeWidth={1.5} />
    </button>
  );
}

/* ── Table columns ───────────────────────────────────────────────── */
const TH =
  "px-5 py-3.5 align-middle text-[10.5px] font-bold tracking-widest uppercase";
const TD = "px-5 py-[14px] align-middle";

function ReleasesTable({ releases, loading, error }) {
  const { user } = useAuth();

  const currentName =
    user?.name ?? user?.username ?? user?.email?.split("@")[0] ?? "You";
  const currentAvatar =
    user?.avatar ?? user?.profilePicture ?? user?.avatarUrl ?? null;

  return (
    <table className="w-full text-sm text-left">
      <thead
        style={{
          backgroundColor: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <tr>
          <th className={TH} style={{ color: "var(--color-text-muted)" }}>
            Release Title
          </th>
          <th className={TH} style={{ color: "var(--color-text-muted)" }}>
            Status
          </th>
          <th className={TH} style={{ color: "var(--color-text-muted)" }}>
            Publish Date
          </th>
          <th className={TH} style={{ color: "var(--color-text-muted)" }}>
            Author
          </th>
          <th
            className={`${TH} text-right pr-6`}
            style={{ color: "var(--color-text-muted)" }}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "var(--color-bg-card)" }}>
        {loading && (
          <tr>
            <td colSpan="5" className="h-28 text-center">
              <div className="flex justify-center items-center gap-2.5">
                <div className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Loading releases…
                </span>
              </div>
            </td>
          </tr>
        )}

        {error && !loading && (
          <tr>
            <td
              colSpan="5"
              className="h-24 text-center text-red-400 text-sm font-medium"
            >
              {error}
            </td>
          </tr>
        )}

        {!loading && !error && releases.length === 0 && (
          <tr>
            <td
              colSpan="5"
              className="h-28 text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              No releases found.
            </td>
          </tr>
        )}

        {!loading &&
          releases.map((release) => {
            const cfg = STATUS_CONFIG[release.status] ?? STATUS_CONFIG.draft;
            const authorName =
              release.createdBy?.name ??
              release.createdBy?.email?.split("@")[0] ??
              currentName;
            const authorAvatar =
              release.createdBy?.avatar ??
              release.createdBy?.profilePicture ??
              currentAvatar;
            const rawDate = release.publishedAt ?? release.createdAt;
            const date = rawDate
              ? new Date(rawDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "—";

            return (
              <tr
                key={release._id}
                className="border-b last:border-0 hover:brightness-105 transition-colors cursor-pointer"
                style={{ borderColor: "var(--color-border)" }}
              >
                {/* Title + snippet */}
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="font-semibold truncate max-w-[280px]"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {release.title}
                      </span>
                      <span
                        className="text-xs truncate max-w-[280px]"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {stripHtml(release.content) || "No description"}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Status badge */}
                <td className={TD}>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold border"
                    style={{
                      backgroundColor: cfg.bg,
                      color: cfg.text,
                      borderColor: cfg.text + "33",
                    }}
                  >
                    {cfg.label}
                  </span>
                </td>

                {/* Date */}
                <td className={TD}>
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {date}
                  </span>
                </td>

                {/* Author */}
                <td className={TD}>
                  <AuthorCell name={authorName} avatarUrl={authorAvatar} />
                </td>

                {/* Actions — always visible */}
                <td className={`${TD} text-right pr-5`}>
                  <RowActions />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

ReleasesTable.propTypes = {
  releases: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ReleasesTable;
