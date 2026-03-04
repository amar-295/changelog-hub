import React, { useState } from 'react';
import { UserCircle, CheckCircle2, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../../../services/authService';
import Input from '../../../components/ui/Input';

function ProfileTab({ user }) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await authService.updateAccount(formData);
      toast.success('Profile updated successfully');
      // A full page reload is a simple way to refresh the global AuthContext state for v1
      window.location.reload();
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20">
      <section className="bg-bg-elevated border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 bg-white/2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCircle size={18} className="text-primary" />
            Personal Details
          </h2>
          <p className="text-xs text-text-muted mt-1 font-medium italic">
            Manage your personal profile information.
          </p>
        </div>
        <div className="p-8 space-y-6">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full md:w-1/2"
            containerClassName="w-full md:w-1/2"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="w-full md:w-1/2"
            containerClassName="w-full md:w-1/2"
          />
        </div>
      </section>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 p-6 bg-white/1 border border-white/5 rounded-2xl shadow-xl">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary px-8 group/save"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving Profile...
            </>
          ) : (
            <>
              Save Profile
              <CheckCircle2
                size={16}
                className="group-hover/save:scale-110 transition-transform"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProfileTab;
