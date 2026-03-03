import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { X, Loader2, Rocket, FileText } from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor/index";
import CategoryDropdown from "./components/CategoryDropdown";
import { useReleaseForm } from "./hooks/useReleaseForm";

function CreateReleaseModal({ isOpen, onClose, onSuccess }) {
  const overlayRef = useRef(null);
  const { form, loading, error, handleField, handleCancel, handleSubmit } =
    useReleaseForm({ isOpen, onSuccess, onClose });

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") handleCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleCancel]);

  if (!isOpen) return null;

  const inputStyle = {
    backgroundColor: "var(--color-bg-input)",
    borderColor: "var(--color-border)",
    color: "var(--color-text-primary)",
  };
  const labelStyle = {
    color: "var(--color-text-secondary)",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-dropdown"
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b shrink-0"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor:
                  "var(--color-primary-muted, rgba(99,102,241,0.12))",
              }}
            >
              <FileText size={18} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h2
                className="text-lg font-black"
                style={{ color: "var(--color-text-primary)" }}
              >
                New Release
              </h2>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Compose and publish a product update
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 transition-all hover:bg-white/10 rounded-lg text-text-muted hover:text-text-primary cursor-pointer active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleField("title", e.target.value)}
              placeholder="e.g. v2.5.0 — Dark Mode Support"
              className="w-full px-4 py-2.5 rounded-lg border text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={inputStyle}
            />
          </div>

          {/* Version + Category */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label style={labelStyle}>Version</label>
              <input
                type="text"
                value={form.version}
                onChange={(e) => handleField("version", e.target.value)}
                placeholder="e.g. 2.5.0"
                className="w-full px-4 py-2.5 rounded-lg border text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                style={inputStyle}
              />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>Category</label>
              <CategoryDropdown
                value={form.category}
                onChange={(val) => handleField("category", val)}
                inputStyle={inputStyle}
              />
            </div>
          </div>

          {/* Rich Text */}
          <div className="space-y-1.5">
            <label style={labelStyle}>Release Notes *</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => handleField("content", html)}
              placeholder="Describe what changed, what's new, and what was fixed..."
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm font-medium text-red-400 border border-red-500/20"
              style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-7 py-5 border-t shrink-0"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-bg-elevated)",
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-sm font-bold border transition-all hover:bg-bg-card-hover hover:border-border-light disabled:opacity-40 cursor-pointer"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-bold border transition-all hover:bg-bg-card-hover hover:border-border-light disabled:opacity-40 cursor-pointer"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              {loading && form.status === "draft" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Save Draft"
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="px-6 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.95] disabled:opacity-40 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Rocket size={14} strokeWidth={2.5} />
              )}
              Publish Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default CreateReleaseModal;
