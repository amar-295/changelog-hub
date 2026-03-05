import React from 'react';
import PropTypes from 'prop-types';

/**
 * Hero section with gradient title and workspace description.
 */
function PublicHero({ workspace }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[11px] text-text-muted font-medium tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Product Updates
        </div>

        <h1
          className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5"
          style={{
            background:
              'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {workspace.name}
        </h1>

        <p className="text-[16px] text-text-secondary max-w-lg mx-auto leading-relaxed">
          {workspace.description ||
            `Everything new, improved, and fixed — delivered as we ship it.`}
        </p>
      </div>
    </div>
  );
}

PublicHero.propTypes = {
  workspace: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default PublicHero;
