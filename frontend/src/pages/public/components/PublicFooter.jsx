import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import Input from '../../../components/ui/Input';

/**
 * Footer with subscribe form and branding.
 */
function PublicFooter({ email, onEmailChange, onSubscribe, isSubscribing }) {
  return (
    <footer className="mt-8 relative">
      {/* Gradient fade */}
      <div className="h-24 bg-linear-to-b from-transparent to-[#050506]" />

      <div className="bg-[#050506] border-t border-white/5 pt-16 pb-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Subscribe block */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-16">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                Never miss an update
              </h3>
              <p className="text-text-muted text-sm">
                Subscribe to get notified when we ship new features.
              </p>
            </div>
            <form
              onSubmit={onSubscribe}
              className="flex gap-2 w-full md:w-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={onEmailChange}
                containerClassName="flex-1 md:w-60"
                className="bg-white/5 border-white/8 text-white focus:border-primary/40 text-[14px] hover:bg-white/10"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shrink-0 disabled:opacity-50"
              >
                {isSubscribing ? 'Wait...' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 opacity-[0.55]">
              <Logo className="w-4 h-4" />
              <span className="text-[11px] text-white font-medium tracking-widest uppercase">
                Powered by ChangelogHub
              </span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-slate-300">
              <button className="hover:text-white transition-colors">
                Privacy
              </button>
              <button className="hover:text-white transition-colors">
                Terms
              </button>
              <button className="hover:text-white transition-colors">
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

PublicFooter.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  isSubscribing: PropTypes.bool.isRequired,
};

export default PublicFooter;
