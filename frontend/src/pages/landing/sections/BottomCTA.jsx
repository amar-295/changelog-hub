import React from 'react';
import { Link } from 'react-router-dom';

function BottomCTA() {
  return (
    <section className="py-24 px-6">
      <div
        className="max-w-3xl mx-auto text-center rounded-3xl px-8 py-20 relative overflow-hidden"
        style={{
          backgroundColor: '#0e0e11',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Multi-layer glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 30% 110%, rgba(59,130,246,0.15), transparent 60%)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          }}
        />

        <p
          className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-4 relative z-10"
          style={{ color: 'var(--color-primary)' }}
        >
          Get started today
        </p>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight mb-5 relative z-10"
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Ship faster.
          <br />
          Communicate clearly.
        </h2>
        <p
          className="text-lg mb-10 max-w-md mx-auto relative z-10"
          style={{ color: 'rgba(255,255,255,0.62)' }}
        >
          Join developers who keep their users in the loop with every single
          release.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <Link
            to="/signup"
            className="relative px-8 py-3.5 rounded-xl text-[14px] font-bold text-white no-underline overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              boxShadow:
                '0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(59,130,246,0.2)',
            }}
          >
            <span className="relative z-10">
              Start for Free — No Credit Card
            </span>
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3.5 rounded-xl text-[14px] font-medium no-underline transition-all hover:bg-white/5"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Already have an account →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BottomCTA;
