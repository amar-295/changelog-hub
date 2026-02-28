import React from "react";

function MetricCard() {
  const cardStyle = {
    backgroundColor: "var(--color-bg-card)",
    borderColor: "var(--color-border)",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Total Views
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: "var(--color-text-primary)" }}
            >
              128.4k
            </h3>
          </div>
          <span
            className="text-emerald-400 font-bold text-sm flex items-center px-2 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}
          >
            +14.2%
          </span>
        </div>
        <div className="flex items-end gap-1 h-12 mt-2">
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "30%",
              backgroundColor: "rgba(129, 140, 248, 0.15)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "50%",
              backgroundColor: "rgba(129, 140, 248, 0.25)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "40%",
              backgroundColor: "rgba(129, 140, 248, 0.35)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "70%",
              backgroundColor: "rgba(129, 140, 248, 0.50)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "90%",
              backgroundColor: "rgba(129, 140, 248, 0.70)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "60%",
              backgroundColor: "rgba(129, 140, 248, 0.60)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{ height: "100%", backgroundColor: "var(--color-primary)" }}
          ></div>
        </div>
      </div>
      {/* Card 2 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Avg. Engagement
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: "var(--color-text-primary)" }}
            >
              64.2%
            </h3>
          </div>
          <span
            className="text-emerald-400 font-bold text-sm flex items-center px-2 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}
          >
            +5.1%
          </span>
        </div>
        <div className="flex items-end gap-1 h-12 mt-2">
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "60%",
              backgroundColor: "rgba(129, 140, 248, 0.15)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "40%",
              backgroundColor: "rgba(129, 140, 248, 0.25)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "80%",
              backgroundColor: "rgba(129, 140, 248, 0.35)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "30%",
              backgroundColor: "rgba(129, 140, 248, 0.50)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "50%",
              backgroundColor: "rgba(129, 140, 248, 0.70)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "90%",
              backgroundColor: "rgba(129, 140, 248, 0.60)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{ height: "75%", backgroundColor: "var(--color-primary)" }}
          ></div>
        </div>
      </div>
      {/* Card 3 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Subscribers
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: "var(--color-text-primary)" }}
            >
              12.5k
            </h3>
          </div>
          <span
            className="text-emerald-400 font-bold text-sm flex items-center px-2 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}
          >
            +8.3%
          </span>
        </div>
        <div className="flex items-end gap-1 h-12 mt-2">
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "40%",
              backgroundColor: "rgba(129, 140, 248, 0.15)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "60%",
              backgroundColor: "rgba(129, 140, 248, 0.25)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "70%",
              backgroundColor: "rgba(129, 140, 248, 0.35)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "85%",
              backgroundColor: "rgba(129, 140, 248, 0.50)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "95%",
              backgroundColor: "rgba(129, 140, 248, 0.70)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: "80%",
              backgroundColor: "rgba(129, 140, 248, 0.60)",
            }}
          ></div>
          <div
            className="w-full rounded-t-sm"
            style={{ height: "100%", backgroundColor: "var(--color-primary)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
