/**
 * @module Settings
 * Workspace settings page with three tabs: Workspace, Profile, and Security.
 * Workspace tab supports updating name, subdomain, description, and logo.
 * All workspace data is managed via TanStack Query (useWorkspace / useUpdateWorkspace).
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Upload,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../../components/Logo';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import SettingsTabs from './components/SettingsTabs';
import ProfileTab from './components/ProfileTab';
import SecurityTab from './components/SecurityTab';
import { useWorkspace, useUpdateWorkspace } from '@/hooks/queries/useWorkspace';

function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('workspace');

  const { data: workspace, isLoading: loading } = useWorkspace();
  const updateWorkspaceMutation = useUpdateWorkspace();
  const saving = updateWorkspaceMutation.isPending;

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subdomain: '',
  });

  // Sync form data when workspace loads
  useEffect(() => {
    if (workspace) {
      setFormData({
        name: workspace.name || '',
        description: workspace.description || '',
        subdomain: workspace.subdomain || '',
      });
      if (workspace.logo) {
        setLogoPreview(workspace.logo);
      }
    }
  }, [workspace]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo must be smaller than 2MB');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatePayload = {
      ...formData,
      logo: logoFile,
    };
    updateWorkspaceMutation.mutate(updatePayload, {
      onSuccess: () => setLogoFile(null),
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
          Settings
        </h1>
        <p className="text-text-secondary max-w-2xl leading-relaxed">
          Manage your workspace preferences, personal profile, and account
          security.
        </p>
      </div>

      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* TABS CONTENT */}
      {activeTab === 'workspace' && (
        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
          {/* General Identity Section */}
          <section className="bg-bg-elevated border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 bg-white/2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Info size={18} className="text-primary" />
                General Identity
              </h2>
              <p className="text-xs text-text-muted mt-1 font-medium italic">
                Basic information about your product or team.
              </p>
            </div>
            <div className="p-8 space-y-6">
              <Input
                label="Workspace Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. My Workspace or App Name"
                required
              />
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe what your app does..."
                  className="w-full px-3.5 py-2.5 bg-bg-input border border-border focus:border-primary focus:ring-primary hover:border-border-light hover:bg-white/10 rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted min-h-[100px] resize-none"
                />
              </div>
            </div>
          </section>

          {/* Branding Section */}
          <section className="bg-bg-elevated border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 bg-white/2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon size={18} className="text-primary" />
                Branding
              </h2>
              <p className="text-xs text-text-muted mt-1 font-medium italic">
                Customize the look of your public changelog.
              </p>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Logo className="w-10 h-10 opacity-40 grayscale" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-lg text-white shadow-lg hover:bg-primary-dark transition-all scale-90 group-hover:scale-100"
                  >
                    <Upload size={14} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">
                    Workspace Logo
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                    Recommended size: 512x512px. Supported formats: PNG, JPG,
                    SVG. Max size: 2MB.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[13px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    Upload New Image
                    <Upload size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Public Access Section */}
          <section className="bg-bg-elevated border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 bg-white/2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe size={18} className="text-primary" />
                Public Access
              </h2>
              <p className="text-xs text-text-muted mt-1 font-medium italic">
                Configure how users access your public changelog.
              </p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Public Subdomain
                </label>
                <div className="relative flex items-center group">
                  <div className="pl-3.5 pr-2 py-2.5 bg-black/20 border border-r-0 border-border rounded-l-lg text-text-muted text-[13px] font-medium flex items-center h-[42px]">
                    localhost:5173/
                  </div>
                  <input
                    type="text"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleChange}
                    placeholder="your-subdomain"
                    className={`flex-1 min-w-0 bg-bg-input border border-border focus:border-primary focus:ring-primary hover:border-border-light hover:bg-white/10 rounded-r-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted h-[42px] px-3.5`}
                  />
                </div>
                <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                  <AlertCircle
                    size={16}
                    className="text-blue-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <h4 className="text-[13px] font-bold text-blue-400">
                      Important Note
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      Changing your subdomain will immediately break all
                      existing links to your public changelog. Existing
                      subscribers won't be redirected automatically.
                    </p>
                  </div>
                </div>

                {workspace && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <a
                      href={`/${workspace.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[13px] font-bold text-text-secondary hover:text-white transition-all group/link"
                    >
                      View Live Page:{' '}
                      <span className="text-primary underline opacity-80 group-hover/link:opacity-100 transition-opacity font-mono">
                        /{workspace.subdomain}
                      </span>
                      <ExternalLink
                        size={14}
                        className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 p-6 bg-white/1 border border-white/5 rounded-2xl shadow-xl">
            <button
              type="button"
              onClick={() => {
                if (workspace) {
                  setFormData({
                    name: workspace.name || '',
                    description: workspace.description || '',
                    subdomain: workspace.subdomain || '',
                  });
                  setLogoPreview(workspace.logo || null);
                  setLogoFile(null);
                }
              }}
              className="btn btn-secondary px-6"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary px-8 group/save"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving Updates...
                </>
              ) : (
                <>
                  Save Workspace Settings
                  <CheckCircle2
                    size={16}
                    className="group-hover/save:scale-110 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'profile' && <ProfileTab user={user} />}
      {activeTab === 'security' && <SecurityTab user={user} />}
    </div>
  );
}

export default Settings;
