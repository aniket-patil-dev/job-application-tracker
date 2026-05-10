import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

function Layout() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar currentPath={location.pathname}/>
        <Outlet />
    </div>
  )
}

export default Layout