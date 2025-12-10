import React from 'react'

export default function GameList({ games = [], onEdit, onDelete, onFav }) {
  return (
    <div>
      {games.map(g => (
        <div key={g._id} className="card">
          <div className="game-row">
            <strong>{g.titre}</strong>
            <div>
              <button className="btn" onClick={() => onEdit(g)}>Modifier</button>
              <button className="btn secondary" onClick={() => onDelete(g._id)} style={{marginLeft:8}}>Supprimer</button>
              <button className={"btn " + (g.favorite ? 'fav-active' : '')} onClick={() => onFav(g._id)} style={{marginLeft:8}}> 
                {g.favorite ? '★' : '☆'}
              </button>
            </div>
          </div>
          <div style={{marginTop:8}}>
            <div><em>{g.genre && g.genre.join(', ')}</em></div>
            <div>Plateforme: {g.plateforme && g.plateforme.length ? g.plateforme[0] : 'N/A'}</div>
            <div>Année: {g.annee_sortie ?? 'N/A'}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
