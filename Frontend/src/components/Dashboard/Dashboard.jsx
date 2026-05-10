import React, { useEffect, useState } from "react";
import IndividualStat from "../shared/IndividualStat";
import ApplicationOverview from "../shared/ApplicationOverview";
import "./Dashboard.css";
import { getApplications, getMe } from "../../api/api";
import Sidebar from "../Sidebar/Sidebar";
import { useApp } from "../../context/AppContext";

function Dashboard() {
  const { user, applications } = useApp();

  const counts = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview").length,
    offered: applications.filter((a) => a.status === "Offered").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const total = applications.length || 1;

  const statusBreakdown = [
    {
      label: "Applied",
      value: Math.round(
        (applications.filter((a) => a.status === "Applied").length / total) *
          100,
      ),
      cls: "fill-applied",
    },
    {
      label: "Interview",
      value: Math.round(
        (applications.filter((a) => a.status === "Interview").length / total) *
          100,
      ),
      cls: "fill-interview",
    },
    {
      label: "Offered",
      value: Math.round(
        (applications.filter((a) => a.status === "Offered").length / total) *
          100,
      ),
      cls: "fill-offered",
    },
    {
      label: "Hired",
      value: Math.round(
        (applications.filter((a) => a.status === "Hired").length / total) * 100,
      ),
      cls: "fill-hired",
    },
    {
      label: "Rejected",
      value: Math.round(
        (applications.filter((a) => a.status === "Rejected").length / total) *
          100,
      ),
      cls: "fill-rejected",
    },
  ];

  return (
    <>
      <div className="right-container">
        <div className="top-container">
          <div className="greetings-container">
            <h1>Good Morning, {user?.f_name} 👋</h1>
            <h3>
              You have <span>{counts.interviews}</span> active interviews this
              week.
            </h3>
          </div>

          <div className="stats">
            <IndividualStat
              title="Total Applied"
              amount={counts.total}
              sub="All time"
            />
            <IndividualStat
              title="Interviews"
              amount={counts.interviews}
              sub="Scheduled"
              accent
            />
            <IndividualStat
              title="Offers"
              amount={counts.offered}
              sub="Pending review"
            />
            <IndividualStat
              title="Rejected"
              amount={counts.rejected}
              sub="This month"
            />
          </div>
        </div>

        <div className="bottom-container">
          <div className="application-details">
            <div className="panel-header">
              <h4>Recent Applications</h4>
              <span className="panel-count">{applications.length} total</span>
            </div>

            <div className="application-overview">
              {applications.length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.3)", padding: "1rem" }}>
                  No applications yet. Start tracking!
                </p>
              ) : (
                applications.map((app) => (
                  <ApplicationOverview
                    key={app.app_id}
                    company={app.company_name}
                    role={app.role}
                    status={app.status}
                    initials={app.company_name?.[0] || "?"}
                  />
                ))
              )}
            </div>
          </div>

          <div className="status-breakdown-container">
            <div className="panel-header">
              <h4>Status Breakdown</h4>
            </div>

            <div className="progress-list">
              {statusBreakdown.map(({ label, value, cls }) => (
                <div className="progress-item" key={label}>
                  <div className="progress-meta">
                    <label>{label}</label>
                    <span className="progress-value">{value}%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${cls}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
