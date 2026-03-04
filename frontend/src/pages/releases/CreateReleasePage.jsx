import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, Rocket, Save } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor/index';
import CategoryDropdown from './components/CategoryDropdown';
import Input from '../../components/ui/Input';
import { useReleaseForm } from './hooks/useReleaseForm';
import { releaseService } from '../../services/releaseService';
import toast from 'react-hot-toast';

/* ──────────────────────────────────────────────────────────
   Standalone full-screen release editor page.
   Route: /releases/new  (outside DashboardLayout)
   ────────────────────────────────────────────────────────── */
function CreateReleasePage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();
  const [initialData, setInitialData] = useState(state?.release || null);
  const [loadingInitial, setLoadingInitial] = useState(!!id && !state?.release);

  useEffect(() => {
    if (id && !initialData) {
      const fetchRelease = async () => {
        try {
          setLoadingInitial(true);
          const response = await releaseService.getReleaseById(id);
          setInitialData(response.data);
        } catch {
          toast.error('Failed to load release');
          navigate('/releases');
        } finally {
          setLoadingInitial(false);
        }
      };
      fetchRelease();
    }
  }, [id, initialData, navigate]);

  const { form, loading, error, handleField, handleCancel, handleSubmit } =
    useReleaseForm({
      isOpen: true,
      onSuccess: () => navigate('/releases'),
      onClose: () => navigate('/releases'),
      initialData,
      isEdit: !!id,
    });

  // Escape → auto-save draft and go back
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCancel]);

  if (loadingInitial) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-page">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg-page">
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center justify-between px-5 border-b h-14"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-[13px] font-medium group shrink-0 cursor-pointer"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Releases
          </button>
          <span className="text-text-muted/40 text-[13px]">›</span>
          <span className="text-text-secondary text-[13px] font-medium truncate">
            {id ? 'Edit Release' : 'New Release'}
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold border transition-all hover:bg-bg-card-hover disabled:opacity-40 cursor-pointer"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold border transition-all hover:bg-bg-card-hover disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            {loading && form.status === 'draft' ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} strokeWidth={2} />
            )}
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Rocket size={13} strokeWidth={2.5} />
            )}
            Publish Now
          </button>
        </div>
      </div>

      {/* ── Two-Column Body ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Metadata Sidebar ─────────────────────────── */}
        <div
          className="w-64 shrink-0 border-r overflow-y-auto flex flex-col gap-5 p-5"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              Title *
            </label>
            <textarea
              value={form.title}
              onChange={(e) => handleField('title', e.target.value)}
              placeholder="e.g. v2.5 — Dark Mode"
              rows={2}
              className="w-full resize-none bg-transparent text-text-primary text-[18px] font-bold leading-snug outline-none border-none focus:ring-0 placeholder:text-text-muted/40"
            />
          </div>

          <div
            className="h-px shrink-0"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              Category
            </label>
            <CategoryDropdown
              value={form.category}
              onChange={(val) => handleField('category', val)}
              inputStyle={{
                backgroundColor: 'var(--color-bg-input)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          {/* Version */}
          <Input
            label="Version"
            value={form.version}
            onChange={(e) => handleField('version', e.target.value)}
            placeholder="e.g. 2.5.0"
          />

          <div
            className="h-px shrink-0"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              Status
            </label>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium w-fit border"
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                borderColor: 'rgba(245, 158, 11, 0.2)',
                color: 'rgb(245, 158, 11)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Draft
            </span>
          </div>

          {/* Error banner (mobile-like, inside sidebar) */}
          {error && (
            <div
              className="px-3 py-2 rounded-lg text-[12px] font-medium text-red-400 border border-red-500/20"
              style={{ backgroundColor: 'rgba(239,68,68,0.08)' }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Right: Rich-Text Editor ────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <RichTextEditor
            content={form.content}
            onChange={(html) => handleField('content', html)}
            placeholder="Write your release notes here…"
            fullPage
          />
        </div>
      </div>
    </div>
  );
}

export default CreateReleasePage;
