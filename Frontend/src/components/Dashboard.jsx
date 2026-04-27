import React from 'react'
import IndividualStat from "./IndividualStat";
import ApplicationOverview from './ApplicationOverview';
import './dashboard.css'

const mockApplications = [
  { company: 'Stripe', role: 'Frontend Engineer', status: 'Interview', initials: 'S' },
  { company: 'Vercel', role: 'Product Designer', status: 'Applied', initials: 'V' },
  { company: 'Linear', role: 'Software Engineer', status: 'Offered', initials: 'L' },
  { company: 'Notion', role: 'Full Stack Developer', status: 'Rejected', initials: 'N' },
  { company: 'Figma', role: 'UX Engineer', status: 'Interview', initials: 'F' },
  { company: 'GitHub', role: 'DevOps Engineer', status: 'Applied', initials: 'G' },
  { company: 'Loom', role: 'React Developer', status: 'Hired', initials: 'L' },
  { company: 'Supabase', role: 'Backend Engineer', status: 'Applied', initials: 'S' },
  { company: 'PlanetScale', role: 'Data Engineer', status: 'Rejected', initials: 'P' },
  // { company: 'Stripe', role: 'Frontend Engineer', status: 'Interview', initials: 'S' },
  // { company: 'Vercel', role: 'Product Designer', status: 'Applied', initials: 'V' },
  // { company: 'Linear', role: 'Software Engineer', status: 'Offered', initials: 'L' },
  // { company: 'Notion', role: 'Full Stack Developer', status: 'Rejected', initials: 'N' },
  // { company: 'Figma', role: 'UX Engineer', status: 'Interview', initials: 'F' },
  // { company: 'GitHub', role: 'DevOps Engineer', status: 'Applied', initials: 'G' },
  // { company: 'Loom', role: 'React Developer', status: 'Hired', initials: 'L' },
  // { company: 'Supabase', role: 'Backend Engineer', status: 'Applied', initials: 'S' },
  // { company: 'PlanetScale', role: 'Data Engineer', status: 'Rejected', initials: 'P' },
]

function Dashboard() {
  return (
    <div className="right-container">
      <div className="top-container">
        <div className="greetings-container">
          <h1>Good Morning, User 👋</h1>
          <h3>You have <span>_</span> active interviews this week.</h3>
        </div>

        <div className="stats">
          <IndividualStat title="Total Applied" amount={30} sub="All time" />
          <IndividualStat title="Interviews" amount={5} sub="Scheduled" accent />
          <IndividualStat title="Offers" amount={1} sub="Pending review" />
          <IndividualStat title="Rejected" amount={12} sub="This month" />
        </div>
      </div>

      <div className="bottom-container">
        <div className="application-details">
          <div className="panel-header">
            <h4>Recent Applications</h4>
            <span className="panel-count">{mockApplications.length} total</span>
          </div>

          <div className="application-overview">
            {mockApplications.map((app, i) => (
              <ApplicationOverview
                key={i}
                company={app.company}
                role={app.role}
                status={app.status}
                initials={app.initials}
              />
            ))}
          </div>
        </div>

        <div className="status-breakdown-container">
          <div className="panel-header">
            <h4>Status Breakdown</h4>
          </div>

          <div className="progress-list">
            {[
              { label: 'Applied',   value: 30, cls: 'fill-applied' },
              { label: 'Interview', value: 17, cls: 'fill-interview' },
              { label: 'Offered',   value: 3,  cls: 'fill-offered' },
              { label: 'Hired',     value: 1,  cls: 'fill-hired' },
              { label: 'Rejected',  value: 40, cls: 'fill-rejected' },
            ].map(({ label, value, cls }) => (
              <div className="progress-item" key={label}>
                <div className="progress-meta">
                  <label>{label}</label>
                  <span className="progress-value">{value}%</span>
                </div>
                <div className="progress-track">
                  <div className={`progress-fill ${cls}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard