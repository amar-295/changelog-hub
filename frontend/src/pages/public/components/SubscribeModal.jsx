import React from 'react';
import PropTypes from 'prop-types';
import { Bell } from 'lucide-react';
import Input from '../../../components/ui/Input';

/**
 * Modal overlay for subscribing to changelog updates.
 */
function SubscribeModal({
  email,
  onEmailChange,
  onSubmit,
  onClose,
  isSubscribing,
}) {
  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111112] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bell size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-[15px]">
              Stay in the loop
            </h3>
            <p className="text-text-muted text-[12px]">
              Get notified about new updates
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={onEmailChange}
            required
            className="py-3 rounded-xl"
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-50"
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe to Updates'}
          </button>
        </form>
        <p className="text-[11px] text-text-muted mt-4 text-center">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

SubscribeModal.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isSubscribing: PropTypes.bool.isRequired,
};

export default SubscribeModal;
