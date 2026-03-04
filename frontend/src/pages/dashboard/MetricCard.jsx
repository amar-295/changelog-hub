import React from 'react';
import PropTypes from 'prop-types';

function MetricCard({ metrics }) {
  const cardStyle = {
    backgroundColor: 'var(--color-bg-card)',
    borderColor: 'var(--color-border)',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-[13px] font-semibold"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Total Releases
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {metrics?.totalReleases || 0}
            </h3>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-[13px] font-semibold"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Avg. Engagement
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {metrics?.avgEngagement || 0}%
            </h3>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-4 transition-all hover:brightness-110"
        style={cardStyle}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className="text-[13px] font-semibold"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Subscribers
            </p>
            <h3
              className="text-3xl font-black mt-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {metrics?.totalSubscribers || 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;

MetricCard.propTypes = {
  metrics: PropTypes.shape({
    totalReleases: PropTypes.number,
    totalSubscribers: PropTypes.number,
    avgEngagement: PropTypes.number,
  }),
};
