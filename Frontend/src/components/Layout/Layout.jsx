import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

function Layout() {
  const location = useLocation()

  return (
    <div className="layout-root">
      <Sidebar currentPath={location.pathname} />
      <div className="layout-content">
        <Outlet />
      </div>

      <nav className="mobile-bottom-nav">
        <Link to="/dashboard" className={`mobile-nav-item ${location.pathname === '/dashboard' ? 'mobile-nav-active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          <span>Dashboard</span>
        </Link>
        <Link to="/applications" className={`mobile-nav-item ${location.pathname === '/applications' ? 'mobile-nav-active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>Applications</span>
        </Link>
        <Link to="/profile" className={`mobile-nav-item ${location.pathname === '/profile' ? 'mobile-nav-active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}

export default Layout