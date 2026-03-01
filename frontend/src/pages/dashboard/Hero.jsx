import React from "react";
import { ExternalLink, Download } from "lucide-react";

function Hero({ user }) {
  const firstName = user?.fullName?.split(" ")[0] || "Alex";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <h2
          className="text-3xl font-black tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Welcome back, {firstName}
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Here's what's happening with your changelog today.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <ExternalLink size={18} strokeWidth={1.5} />
          View Public Page
        </button>
        <button
          className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all flex items-center gap-2 hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary-dark)",
          }}
        >
          <Download size={18} strokeWidth={1.5} />
          Export
        </button>
      </div>
    </div>
  );
}

export default Hero;
