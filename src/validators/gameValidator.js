const Joi = require('joi');

const gameSchema = Joi.object({
  titre: Joi.string().min(1).required(),
  genre: Joi.array().items(Joi.string()).min(1).required(),
  plateforme: Joi.array().items(Joi.string()).min(1).required(),
  editeur: Joi.string().allow('', null),
  developpeur: Joi.string().allow('', null),
  annee_sortie: Joi.number().integer().min(1970).max(new Date().getFullYear()),
  metacritic_score: Joi.number().min(0).max(100),
  temps_jeu_heures: Joi.number().min(0),
  termine: Joi.boolean()
});

function validateGame(req, res, next) {
  const { error } = gameSchema.validate(req.body, { abortEarly: false, allowUnknown: false });
  if (error) return res.status(400).json({ error: error.details.map(d => d.message) });
  next();
}

module.exports = { validateGame };
