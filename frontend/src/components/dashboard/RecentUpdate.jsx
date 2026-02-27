import React from "react";

function RecentUpdate() {
  const thStyle = { color: "var(--color-text-muted)" };
  const titleStyle = { color: "var(--color-text-primary)" };

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
          className="text-sm font-bold hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
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
            {/* Row 1 */}
            <tr
              className="border-b transition-colors hover:brightness-110"
              style={{ borderColor: "var(--color-border)" }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                  <span className="font-bold" style={titleStyle}>
                    v2.4.0: The AI-Powered Editor
                  </span>
                </div>
              </td>
              <td
                className="px-6 py-4 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Oct 24, 2023
              </td>
              <td className="px-6 py-4">
                <div
                  className="w-32 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <div
                    className="h-full w-3/4 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-emerald-400"
                  style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}
                >
                  Published
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-1 rounded transition-colors hover:opacity-80">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr
              className="border-b transition-colors hover:brightness-110"
              style={{ borderColor: "var(--color-border)" }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                  <span className="font-bold" style={titleStyle}>
                    New Collaborative Workspaces
                  </span>
                </div>
              </td>
              <td
                className="px-6 py-4 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Oct 20, 2023
              </td>
              <td className="px-6 py-4">
                <div
                  className="w-32 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <div
                    className="h-full w-1/2 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-emerald-400"
                  style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}
                >
                  Published
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-1 rounded transition-colors hover:opacity-80">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 3 */}
            <tr
              className="border-b transition-colors hover:brightness-110"
              style={{ borderColor: "var(--color-border)" }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: "var(--color-text-muted)" }}
                  ></div>
                  <span className="font-bold" style={titleStyle}>
                    Winter Performance Enhancements
                  </span>
                </div>
              </td>
              <td
                className="px-6 py-4 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Scheduled
              </td>
              <td className="px-6 py-4">
                <div
                  className="w-32 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <div
                    className="h-full w-0 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-amber-400"
                  style={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                >
                  Scheduled
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-1 rounded transition-colors hover:opacity-80">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="transition-colors hover:brightness-110">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: "var(--color-text-muted)" }}
                  ></div>
                  <span className="font-bold" style={titleStyle}>
                    Dark Mode Implementation Guide
                  </span>
                </div>
              </td>
              <td
                className="px-6 py-4 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Draft
              </td>
              <td className="px-6 py-4">
                <div
                  className="w-32 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <div
                    className="h-full w-0 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full"
                  style={{
                    backgroundColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Draft
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-1 rounded transition-colors hover:opacity-80">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    more_vert
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentUpdate;
