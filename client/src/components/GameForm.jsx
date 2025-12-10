import React, { useState, useEffect } from 'react'

export default function GameForm({ onSubmit, initial, onCancel }) {
  const [state, setState] = useState({
    titre: '', genre: [], plateforme: ['PC'], annee_sortie: ''
  });

  useEffect(() => {
    if (initial) {
      setState({
        titre: initial.titre || '',
        genre: initial.genre || [],
        plateforme: (initial.plateforme && initial.plateforme.length ? [initial.plateforme[0]] : ['PC']),
        annee_sortie: initial.annee_sortie || ''
      });
    } else {
      // Reset form when not editing
      setState({
        titre: '',
        genre: [],
        plateforme: ['PC'],
        annee_sortie: ''
      });
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'genre') {
      setState(prev => ({ ...prev, genre: value.split(',').map(s => s.trim()).filter(Boolean) }));
    } else if (name === 'plateforme') {
      setState(prev => ({ ...prev, plateforme: [value] }));
    } else {
      setState(prev => ({ ...prev, [name]: value }));
    }
  }

  function submit(e) {
    e.preventDefault();
    const payload = { ...state };
    if (payload.annee_sortie) payload.annee_sortie = Number(payload.annee_sortie);
    onSubmit(payload);
    setState({ titre: '', genre: [], plateforme: ['PC'], annee_sortie: '' });
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>{initial ? 'Modifier un jeu' : 'Ajouter un jeu'}</h3>

      <label>Titre</label>
      <input name="titre" value={state.titre} onChange={handleChange} required />

      <label>Genre</label>
      <input name="genre" value={state.genre.join(', ')} onChange={handleChange} placeholder="Ex: Action, Aventure" />

      <label>Année de sortie</label>
      <input name="annee_sortie" value={state.annee_sortie} onChange={handleChange} />

      <label>Plateforme</label>
      <select name="plateforme" value={state.plateforme[0]} onChange={handleChange}>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
        <option value="Switch">Switch</option>
      </select>

      <div style={{marginTop:8}}>
        <button className="btn" type="submit">{initial ? 'Mettre à jour' : 'Ajouter'}</button>
        <button type="button" className="btn secondary" style={{marginLeft:8}} onClick={() => { if (typeof onCancel === 'function') onCancel(); else setState({ titre: '', genre: [], plateforme: ['PC'], annee_sortie: '' }); }}>{'Annuler'}</button>
      </div>
    </form>
  )
}
