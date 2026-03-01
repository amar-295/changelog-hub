import React, { useState, useEffect } from "react";
import { MoreVertical, Inbox } from "lucide-react";
import { releaseService } from "../../services/releaseService";

function RecentUpdate({ onTotalReleasesLoaded }) {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        // Fetch first page, limit 4
        const response = await releaseService.getAllReleases({
          page: 1,
          limit: 4,
        });
        setReleases(response.data?.releases || []);
        if (
          response.data?.pagination?.totalReleases !== undefined &&
          onTotalReleasesLoaded
        ) {
          onTotalReleasesLoaded(response.data.pagination.totalReleases);
        }
      } catch (error) {
        console.error("Failed to fetch recent updates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const thStyle = { color: "var(--color-text-muted)" };
  const titleStyle = { color: "var(--color-text-primary)" };

  const getStatusInfo = (status) => {
    switch (status) {
      case "published":
        return {
          text: "Published",
          color: "text-blue-400",
          bg: "rgba(59, 130, 246, 0.1)",
          dot: "var(--color-primary)",
        };
      case "draft":
        return {
          text: "Draft",
          color: "var(--color-text-secondary)",
          bg: "var(--color-border)",
          dot: "var(--color-text-muted)",
        };
      case "archived":
        return {
          text: "Archived",
          color: "text-amber-400",
          bg: "rgba(251, 191, 36, 0.1)",
          dot: "var(--color-text-muted)",
        };
      default:
        return {
          text: status,
          color: "var(--color-text-secondary)",
          bg: "var(--color-border)",
          dot: "var(--color-text-muted)",
        };
    }
  };

  const formatDate = (dateString, status) => {
    if (status === "draft") return "Draft";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="p-6 border-b flex items-center justify-between"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h3
          className="font-black text-lg"
          style={{ color: "var(--color-text-primary)" }}
        >
          Recent Updates
        </h3>
        <button
          className="text-sm font-bold hover:underline cursor-pointer"
          style={{ color: "var(--color-primary)" }}
        >
          View All
        </button>
      </div>
      <div className="overflow-x-auto min-h-[300px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="animate-pulse flex flex-col items-center gap-3">
              <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Loading updates...
              </span>
            </div>
          </div>
        ) : releases.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
            <div
              className="p-4 rounded-full bg-bg-elevated"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Inbox size={32} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p
                className="font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                No updates yet
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Your recent product releases will appear here.
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-elevated)" }}>
                <th
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest"
                  style={thStyle}
                >
                  Title
                </th>
                <th
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest"
                  style={thStyle}
                >
                  Date
                </th>
                <th
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest"
                  style={thStyle}
                >
                  Engagement
                </th>
                <th
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest"
                  style={thStyle}
                >
                  Status
                </th>
                <th
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right"
                  style={thStyle}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {releases.map((release, idx) => {
                const status = getStatusInfo(release.status);
                // Simulation of engagement bar for UI polish
                const engagementWidth =
                  release.status === "published" ? 75 - idx * 15 + "%" : "0%";

                return (
                  <tr
                    key={release._id || idx}
                    className="border-b last:border-0 transition-colors hover:brightness-110"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-2 rounded-full"
                          style={{ backgroundColor: status.dot }}
                        ></div>
                        <span
                          className="font-bold line-clamp-1"
                          style={titleStyle}
                        >
                          {release.title}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm whitespace-nowrap"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {formatDate(release.createdAt, release.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="w-32 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: "var(--color-border)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            width: engagementWidth,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${status.color}`}
                        style={{ backgroundColor: status.bg }}
                      >
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 rounded transition-colors hover:opacity-80 cursor-pointer">
                        <MoreVertical
                          size={18}
                          strokeWidth={1.5}
                          style={{ color: "var(--color-text-muted)" }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RecentUpdate;
