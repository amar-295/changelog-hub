import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  Loader2,
  Rocket,
  FileText,
  Sparkles,
  ArrowUpRight,
  Bug,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor";
import { releaseService } from "../../services/releaseService";

const CATEGORIES = [
  { id: "feature", label: "Feature", icon: Sparkles, color: "text-blue-400" },
  {
    id: "improvement",
    label: "Improvement",
    icon: ArrowUpRight,
    color: "text-violet-400",
  },
  { id: "bugfix", label: "Bugfix", icon: Bug, color: "text-red-400" },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    color: "text-amber-400",
  },
  { id: "other", label: "Other", icon: MoreHorizontal, color: "text-gray-400" },
];

function CreateReleaseModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    version: "",
    category: "feature",
    status: "draft",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const overlayRef = useRef(null);
  const categoryRef = useRef(null);

  // Reset form on open
  useEffect(() => {
    if (isOpen) {
      setForm({
        title: "",
        version: "",
        category: "feature",
        status: "draft",
        content: "",
      });
      setError(null);
    }
  }, [isOpen]);

  // Handle Cancel / Auto-Save as Draft
  const handleCancel = async () => {
    const hasContent =
      form.title.trim() !== "" ||
      (form.content &&
        form.content !== "<p></p>" &&
        form.content.trim() !== "");
    if (hasContent) {
      try {
        setLoading(true);
        const autoTitle = form.title.trim() || "Untitled Release";
        await releaseService.createRelease({
          ...form,
          title: autoTitle,
          status: "draft",
        });
        onSuccess?.();
      } catch (err) {
        console.error("Auto-draft failed", err);
      } finally {
        setLoading(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (isCategoryOpen) {
          setIsCategoryOpen(false);
        } else {
          handleCancel();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [form, onClose, isCategoryOpen]);

  // Handle clicks outside category dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    if (isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryOpen]);

  if (!isOpen) return null;

  const handleField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (publishNow = false) => {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.content || form.content === "<p></p>") {
      setError("Content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const payload = {
        ...form,
        status: publishNow ? "published" : form.status,
      };
      await releaseService.createRelease(payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create release. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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

  const categoryColors = {
    feature: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    improvement: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    bugfix: "bg-red-500/10 text-red-400 border-red-500/20",
    security: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    other: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    // Backdrop
    // Backdrop: removed onClick to prevent accidental closure
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Modal */}
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
            className="p-2 transition-all hover:bg-white/5 rounded-lg text-text-muted hover:text-text-primary cursor-pointer active:scale-90"
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

          {/* Version + Category row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Version */}
            <div className="space-y-1.5 px-0">
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

            {/* Category */}
            <div className="space-y-1.5 px-0">
              <label style={labelStyle}>Category</label>
              <div className="relative" ref={categoryRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm font-medium flex items-center justify-between transition-all hover:border-primary-dark/40 cursor-pointer text-left"
                  style={inputStyle}
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const active = CATEGORIES.find(
                        (c) => c.id === form.category,
                      );
                      const Icon = active.icon;
                      return (
                        <>
                          <Icon
                            size={16}
                            strokeWidth={1.5}
                            className={active.color}
                          />
                          <span className="capitalize">{active.label}</span>
                        </>
                      );
                    })()}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </button>

                {/* Dropdown Menu */}
                {isCategoryOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 py-1.5 rounded-lg border shadow-xl z-50 animate-dropdown overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {CATEGORIES.map((c) => {
                      const Icon = c.icon;
                      const isActive = form.category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            handleField("category", c.id);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer capitalize ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              size={16}
                              strokeWidth={1.5}
                              className={isActive ? "text-white" : c.color}
                            />
                            <span>{c.label}</span>
                          </div>
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rich Text Editor */}
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

        {/* Footer Actions */}
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
            {/* Save as Draft */}
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

            {/* Publish */}
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

export default CreateReleaseModal;
