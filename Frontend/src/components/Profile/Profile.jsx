import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useApp } from '../../context/AppContext'
import './Profile.css'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate()
  const { user, applications, setUser, setApplications } = useApp()
  const initials = user?.f_name?.[0] ?? '?'
  const fullName = user ? `${user.f_name} ${user.l_name}` : '—'

  const logout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
    setApplications([])
    navigate("/login")
  }

  return (
    <div className='full-profile-container'>

      <div className='profile-page-header'>
        <h1>Profile</h1>
        <p>Your account details</p>
      </div>

      <div className='profile-card-container'>
        <div className='profile-picture'>{initials}</div>
        <div className='profile-details'>
          <h1>{fullName}</h1>
          <h3>{user?.email ?? '—'}</h3>
          <span className='profile-badge'>Free Plan</span>
        </div>
      </div>

      <div className='profile-info-section'>
        <p className='section-title'>Account Info</p>
        <div className='info-grid'>
          <div className='info-item'>
            <label>First Name</label>
            <span>{user?.f_name ?? '—'}</span>
          </div>
          <div className='info-item'>
            <label>Last Name</label>
            <span>{user?.l_name ?? '—'}</span>
          </div>
          <div className='info-item'>
            <label>Email</label>
            <span>{user?.email ?? '—'}</span>
          </div>
          <div className='info-item'>
            <label>Total Applications</label>
            <span>{applications?.length ?? 0}</span>
          </div>
        </div>
      </div>

      <button onClick={logout}>
        LogOut
        <FontAwesomeIcon icon={faRightFromBracket} style={{color: "rgb(255, 0, 0)",}} />
      </button>

    </div>
  )
}

export default Profile