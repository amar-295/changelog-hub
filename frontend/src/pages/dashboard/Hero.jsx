import React from "react";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <h2
          className="text-3xl font-black tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Welcome back, Alex
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Here's what's happening with your changelog today.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border hover:opacity-90"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <span className="material-symbols-outlined text-[20px]">
            visibility
          </span>
          View Public Page
        </button>
        <button
          className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow-lg flex items-center gap-2 hover:opacity-90"
          style={{
            backgroundColor: "var(--color-primary-dark)",
            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.25)",
          }}
        >
          <span className="material-symbols-outlined text-[20px]">
            ios_share
          </span>
          Export
        </button>
      </div>
    </div>
  );
}

export default Hero;
