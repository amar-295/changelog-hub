import React from "react";

function Header() {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b"
      style={{
        backgroundColor: "rgba(26, 29, 35, 0.85)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="w-96 relative">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
        >
          search
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none border transition-all focus:ring-2"
          style={{
            backgroundColor: "var(--color-bg-input)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-primary)",
            "--tw-ring-color": "rgba(129, 140, 248, 0.3)",
          }}
          placeholder="Search for updates, metrics..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-6">
        <button
          className="relative p-2 rounded-full transition-colors hover:opacity-80"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="material-symbols-outlined">notifications</span>
          <span
            className="absolute top-2 right-2 size-2 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></span>
        </button>
        <div
          className="flex items-center gap-3 pl-6 border-l"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="text-right">
            <p
              className="text-sm font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Alex Rivera
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Admin Account
            </p>
          </div>
          <div
            className="size-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
            }}
          >
            AR
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
