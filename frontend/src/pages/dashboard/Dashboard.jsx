import React, { useState } from 'react';
import Hero from './Hero';
import MetricCard from './MetricCard';
import RecentUpdate from '../releases/RecentUpdate';
import ActionBtn from './ActionBtn';
import { useAuth } from '../../context/AuthContext';
import { workspaceService } from '../../services/workspaceService';

function Dashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    totalReleases: 0,
    totalSubscribers: 0,
    avgEngagement: 0,
  });

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await workspaceService.getWorkspaceMetrics();
        if (response.success) {
          setMetrics(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

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
