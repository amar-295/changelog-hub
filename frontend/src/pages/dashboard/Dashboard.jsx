import React from "react";
import Hero from "./Hero";
import MetricCard from "./MetricCard";
import RecentUpdate from "../releases/RecentUpdate";
import ActionBtn from "./ActionBtn";

function Dashboard() {
  return (
    <>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <Hero />
        <MetricCard />
        <RecentUpdate />
      </div>
      <ActionBtn />
    </>
  );
}

export default Dashboard;
