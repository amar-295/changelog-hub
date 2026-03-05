import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '@/services';
import { Input } from '@/components/ui';

function SecurityTab({ user }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  // If a user has no email or created with an external provider,
  // they might not have a password set up natively yet.
  const hasExternalAuth = !user?.password && user?.githubId;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Basic length check matching backend model
    if (formData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    try {
      setSaving(true);
      await authService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      toast.success('Password changed successfully');
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20">
      <section className="bg-bg-elevated border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 bg-white/2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-red-400" />
            Account Security
          </h2>
          <p className="text-xs text-text-muted mt-1 font-medium italic">
            Manage your password and authentication methods.
          </p>
        </div>

        {hasExternalAuth ? (
          <div className="p-8">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center text-center py-10">
              <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                <Info size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">
                GitHub Authenticated
              </h3>
              <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                You signed up using GitHub, so you do not have a separate
                password for this account. Please manage your authentication
                directly through GitHub.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-8 space-y-6">
              <Input
                label="Current Password"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full md:w-1/2"
                containerClassName="w-full md:w-1/2"
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full md:w-1/2"
                containerClassName="w-full md:w-1/2"
              />
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full md:w-1/2"
                containerClassName="w-full md:w-1/2"
              />
            </div>
            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 p-6 bg-white/1 border border-white/5 rounded-b-2xl shadow-xl border-t">
              <button
                type="submit"
                disabled={
                  saving || !formData.oldPassword || !formData.newPassword
                }
                className="btn btn-primary px-8 group/save disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Change Password
                    <CheckCircle2
                      size={16}
                      className="group-hover/save:scale-110 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </section>
    </form>
  );
}

export default SecurityTab;
