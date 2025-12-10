import React from 'react'

export default function Stats({ stats }) {
  if (!stats) return null;
  return (
    <div className="card">
      <h3>Stats</h3>
      <div><strong>Total jeux:</strong> {stats.total}</div>
      <div><strong>Temps total:</strong> {stats.totalTemps} heures</div>
      <div style={{marginTop:8}}>
        <strong>Jeux par plateforme:</strong>
        <ul style={{marginTop:6, paddingLeft:18}}>
          <li>PC: {stats.byPlatform?.PC ?? 0}</li>
          <li>PlayStation: {stats.byPlatform?.PlayStation ?? 0}</li>
          <li>Xbox: {stats.byPlatform?.Xbox ?? 0}</li>
          <li>Switch: {stats.byPlatform?.Switch ?? 0}</li>
        </ul>
      </div>
    </div>
  )
}
