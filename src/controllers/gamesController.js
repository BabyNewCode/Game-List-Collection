const Game = require('../models/game');
const { Writable } = require('stream');

async function createGame(req, res, next) {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

async function listGames(req, res, next) {
  try {
    const filter = {};
    // support ?genre=RPG or ?genre=RPG&genre=Action (express parses repeated params into array)
    if (req.query.genre) {
      const genres = Array.isArray(req.query.genre) ? req.query.genre : [req.query.genre];
      filter.genre = { $in: genres };
    }
    if (req.query.plateforme) {
      const plats = Array.isArray(req.query.plateforme) ? req.query.plateforme : [req.query.plateforme];
      filter.plateforme = { $in: plats };
    }
    const games = await Game.find(filter).sort({ date_ajout: -1 });
    res.json(games);
  } catch (err) {
    next(err);
  }
}

async function getGame(req, res, next) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Not found' });
    res.json(game);
  } catch (err) {
    next(err);
  }
}

async function updateGame(req, res, next) {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!game) return res.status(404).json({ error: 'Not found' });
    res.json(game);
  } catch (err) {
    next(err);
  }
}

async function deleteGame(req, res, next) {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function favoriteGame(req, res, next) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Not found' });
    game.favorite = !game.favorite;
    await game.save();
    res.json(game);
  } catch (err) {
    next(err);
  }
}

async function exportGames(req, res, next) {
  try {
    const games = await Game.find().lean();
    res.setHeader('Content-Disposition', 'attachment; filename="games-export.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(games, null, 2));
  } catch (err) {
    next(err);
  }
}

async function getStats(req, res, next) {
  try {
    const total = await Game.countDocuments();
    const aggTemps = await Game.aggregate([
      { $group: { _id: null, totalTemps: { $sum: { $ifNull: ['$temps_jeu_heures', 0] } } } }
    ]);
    const totalTemps = aggTemps[0] ? aggTemps[0].totalTemps : 0;

    // Count per platform (only the main platforms we care about)
    const platsAgg = await Game.aggregate([
      { $unwind: { path: '$plateforme', preserveNullAndEmptyArrays: false } },
      { $group: { _id: '$plateforme', count: { $sum: 1 } } }
    ]);
    const byPlatform = { PC: 0, PlayStation: 0, Xbox: 0, Switch: 0 };
    platsAgg.forEach(p => { if (p._id && byPlatform.hasOwnProperty(p._id)) byPlatform[p._id] = p.count; });

    res.json({ total, totalTemps, byPlatform });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGame,
  listGames,
  getGame,
  updateGame,
  deleteGame,
  favoriteGame,
  exportGames,
  getStats
};
