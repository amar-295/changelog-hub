import React from 'react';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for indie developers and side projects.',
    features: [
      '1 workspace',
      'Up to 10 releases/month',
      '100 subscribers',
      'Public changelog page',
      'Email notifications',
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    highlighted: false,
    accentColor: 'rgba(255,255,255,0.1)',
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For growing products that need more power.',
    features: [
      'Unlimited workspaces',
      'Unlimited releases',
      'Unlimited subscribers',
      'Custom domain',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
    highlighted: true,
    badge: 'Most Popular',
    accentColor: 'rgba(99,102,241,0.5)',
  },
  {
    name: 'Team',
    price: '$39',
    period: 'per month',
    description: 'For teams shipping fast and communicating clearly.',
    features: [
      'Everything in Pro',
      'Multiple team members',
      'Role-based access',
      'Audit log',
      'SSO / SAML',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaLink: '/signup',
    highlighted: false,
    accentColor: 'rgba(255,255,255,0.1)',
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p
          className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Pricing
        </p>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Simple, transparent pricing
        </h2>
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Start free. Upgrade when you grow. No hidden fees, ever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className="relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: tier.highlighted
                ? '#0e0e11'
                : 'var(--color-bg-card)',
              border: tier.highlighted
                ? '1px solid rgba(99,102,241,0.45)'
                : '1px solid rgba(255,255,255,0.07)',
              boxShadow: tier.highlighted
                ? '0 0 60px rgba(99,102,241,0.18), 0 0 120px rgba(59,130,246,0.08)'
                : 'none',
            }}
          >
            {/* Glow orb for highlighted */}
            {tier.highlighted && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 blur-[60px]"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)',
                  }}
                />
              </div>
            )}

            {tier.badge && (
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-white"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                }}
              >
                {tier.badge}
              </div>
            )}

            <div className="relative z-10">
              <h3
                className="text-[15px] font-bold mb-1"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                {tier.name}
              </h3>
              <div className="flex items-end gap-1 mb-2">
                <span
                  className="text-4xl font-black"
                  style={{
                    color: tier.highlighted ? '#fff' : 'rgba(255,255,255,0.85)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {tier.price}
                </span>
                <span
                  className="text-[13px] mb-1.5"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  /{tier.period}
                </span>
              </div>
              <p
                className="text-[13.5px]"
                style={{ color: 'rgba(255,255,255,0.58)' }}
              >
                {tier.description}
              </p>
            </div>

            <Link
              to={tier.ctaLink}
              className="relative w-full py-2.5 rounded-xl text-[13.5px] font-semibold text-center no-underline overflow-hidden group z-10 transition-all hover:opacity-90"
              style={
                tier.highlighted
                  ? {
                      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                    }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.65)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              <span className="relative z-10">{tier.cta}</span>
              {tier.highlighted && (
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              )}
            </Link>

            <ul className="flex flex-col gap-3 relative z-10">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-[13.5px]"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      tier.highlighted ? '#6366f1' : 'rgba(255,255,255,0.3)'
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
