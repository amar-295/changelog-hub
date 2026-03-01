import React, { useState } from "react";
import Hero from "./Hero";
import MetricCard from "./MetricCard";
import RecentUpdate from "../releases/RecentUpdate";
import ActionBtn from "./ActionBtn";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [totalReleases, setTotalReleases] = useState(0);

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <Hero user={user} />
        <MetricCard totalReleases={totalReleases} />
        <RecentUpdate onTotalReleasesLoaded={setTotalReleases} />
      </div>
      <ActionBtn />
    </>
  );
}

export default Dashboard;
