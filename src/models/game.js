const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  genre: [{ type: String }],
  plateforme: [{ type: String }],
  editeur: { type: String },
  developpeur: { type: String },
  annee_sortie: { type: Number },
  metacritic_score: { type: Number, min: 0, max: 100 },
  temps_jeu_heures: { type: Number, min: 0 },
  termine: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'date_ajout', updatedAt: 'date_modification' } });

module.exports = mongoose.model('Game', GameSchema);
