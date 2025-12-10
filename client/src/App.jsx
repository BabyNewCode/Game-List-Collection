import React, { useEffect, useState } from 'react'
import { fetchGames, createGame, updateGame, deleteGame, favoriteGame, fetchStats } from './api'
import GameList from './components/GameList'
import GameForm from './components/GameForm'
import Stats from './components/Stats'

export default function App() {
  const [games, setGames] = useState([]);
  const [editing, setEditing] = useState(null);
  const [stats, setStats] = useState(null);
  const [view, setView] = useState('list');
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  async function load() {
    try {
      const list = await fetchGames();
      setGames(list);
      const s = await fetchStats();
      setStats(s);
    } catch (err) {
      setError('Erreur lors du chargement: ' + err.message);
      console.error(err);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(data) {
    try {
      setError(null);
      await createGame(data);
      await load();
      setView('list');
    } catch (err) {
      setError('Erreur lors de la création: ' + err.message);
      console.error(err);
    }
  }

  async function handleUpdate(data) {
    if (!editing) return;
    await updateGame(editing._id, data);
    setEditing(null);
    await load();
    setView('list');
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ce jeu ?')) return;
    await deleteGame(id);
    await load();
  }

  async function handleFav(id) { await favoriteGame(id); await load(); }

  const filteredGames = games.filter(g => {
    const matchesSearch = !search || (g.titre && g.titre.toLowerCase().includes(search.toLowerCase()));
    const matchesFav = !showFavs || !!g.favorite;
    return matchesSearch && matchesFav;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Collection de Jeux</h1>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <input className="search" placeholder="Rechercher par titre..." value={search} onChange={e=>setSearch(e.target.value)} />
          <button className={"btn " + (showFavs ? 'fav-active' : 'secondary')} onClick={() => setShowFavs(s => !s)}>{showFavs ? 'Tous' : 'Favoris'}</button>
          {view === 'list' ? (
            <button className="btn" onClick={() => { setEditing(null); setView('form'); }}>Ajouter</button>
          ) : (
            <button className="btn secondary" onClick={() => { setEditing(null); setView('list'); }}>Retour</button>
          )}
        </div>
      </header>

      {error && <div style={{padding:'12px', margin:'8px 0', background:'#fee', border:'1px solid #f99', borderRadius:'6px', color:'#c00'}}>{error}</div>}

      {view === 'list' ? (
        <div className="grid">
          <div>
            <GameList games={filteredGames} onEdit={(g)=>{ setEditing(g); setView('form'); setSearch(''); }} onDelete={handleDelete} onFav={handleFav} />
          </div>
          <div>
            <Stats stats={stats} />
          </div>
        </div>
      ) : (
        <div style={{maxWidth:720, margin:'0 auto'}}>
          <GameForm onSubmit={editing ? handleUpdate : handleCreate} initial={editing} onCancel={() => { setEditing(null); setView('list'); }} />
        </div>
      )}
    </div>
  )
}
