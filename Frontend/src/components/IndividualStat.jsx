import React from 'react'
import './individual.css'

function IndividualStat({ title, amount, sub, accent }) {
  return (
    <div className={`stat-container${accent ? ' accent' : ''}`}>
      <span className="stat-label">{title}</span>
      <span className="stat-amount">{amount}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  )
}

export default IndividualStat