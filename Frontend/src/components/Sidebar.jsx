import React from 'react'
import "./sidebar.css"

function Sidebar() {
  return (
    <div className='container'>
      <div className="header-container">
        <h1>Trackr</h1>
        <h3>Job Application Tracker</h3>
      </div>

      <div className='selection-container'>
        <ul>
          <li className="nav-label">Menu</li>
          <li className='active'>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#00d4aa'}}>
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </li>
          <li>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            Applications
          </li>
          <li>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </li>
        </ul>
      </div>

      <div className='profile-container'>
        <div className='profile-avatar'>U</div>
        <div className='profile-info'>
          <h2>Username</h2>
          <h3>Free Plan</h3>
        </div>
      </div>
    </div>
  )
}

export default Sidebar