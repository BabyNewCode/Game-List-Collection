const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

async function request(path, opts = {}) {
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const fetchGames = (query = '') => request(`/api/games${query}`);
export const createGame = (data) => request('/api/games', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const updateGame = (id, data) => request(`/api/games/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
export const deleteGame = (id) => request(`/api/games/${id}`, { method: 'DELETE' });
export const favoriteGame = (id) => request(`/api/games/${id}/favorite`, { method: 'POST' });
export const exportGames = () => fetch('/api/games/export').then(r => r.blob());
export const fetchStats = () => request('/api/stats');
