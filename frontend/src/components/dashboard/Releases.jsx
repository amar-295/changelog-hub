import React from "react";
import Header from "./Header";

function Releases() {
  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h2
              className="text-3xl font-black tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              Releases
            </h2>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Manage and publish your product updates.
            </p>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow-lg flex items-center gap-2 hover:opacity-90"
            style={{
              backgroundColor: "var(--color-primary-dark)",
              boxShadow: "0 10px 25px rgba(99, 102, 241, 0.25)",
            }}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Release
          </button>
        </div>

        {/* Placeholder for releases list */}
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <span
            className="material-symbols-outlined text-6xl mb-4 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            description
          </span>
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No releases yet
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Create your first release to start sharing updates with your users.
          </p>
        </div>
      </div>
    </>
  );
}

export default Releases;
