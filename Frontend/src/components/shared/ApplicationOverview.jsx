import React from 'react'
import './overview.css'

const statusClasses = {
  Applied: 'status-applied',
  Interview: 'status-interview',
  Offered: 'status-offered',
  Rejected: 'status-rejected',
  Hired: 'status-hired',
}

function ApplicationOverview({ company = 'Company Name', title = 'Job Title', status = 'Applied', initials = 'C' }) {
  return (
    <div className='overview-container'>
      <div className='company-logo'>
        <span className='logo-placeholder'>{initials}</span>
      </div>

      <div className='company-details'>
        <span className='company-name'>{company}</span>
        <span className='job-title'>{title}</span>
      </div>

      <span className={`current-status ${statusClasses[status] || 'status-applied'}`}>
        {status}
      </span>
    </div>
  )
}

export default ApplicationOverview