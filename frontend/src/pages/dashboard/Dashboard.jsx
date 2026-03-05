/**
 * @module Dashboard
 * Main dashboard overview page showing hero greeting, workspace metrics,
 * and a snapshot of recent releases.
 */
import React from 'react';
import Hero from './Hero';
import MetricCard from './MetricCard';
import RecentUpdate from '../releases/RecentUpdate';
import ActionBtn from './ActionBtn';
import { useAuth } from '@/context/AuthContext';
import { useWorkspaceMetrics } from '@/hooks/queries/useWorkspace';

function Dashboard() {
  const { user } = useAuth();
  const { data: metricsData } = useWorkspaceMetrics();

  const metrics = metricsData ?? {
    totalReleases: 0,
    totalSubscribers: 0,
    avgEngagement: 0,
  };

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <Hero user={user} />
        <MetricCard metrics={metrics} />
        <RecentUpdate />
      </div>
      <ActionBtn />
    </>
  );
}

export default Dashboard;
