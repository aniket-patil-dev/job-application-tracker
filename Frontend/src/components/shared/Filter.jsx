import React from 'react'
import './Filter.css'

function Filter({context, isActive, onClick}) {
  return (
    <button
        className={`filter-button ${isActive ? 'filter-active' : ''}`}
        onClick={onClick}
    >
        {context}
    </button>
  )
}

export default Filter