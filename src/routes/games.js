const express = require('express');
const router = express.Router();
const controller = require('../controllers/gamesController');
const { validateGame } = require('../validators/gameValidator');

router.post('/', validateGame, controller.createGame);
router.get('/export', controller.exportGames);
router.post('/:id/favorite', controller.favoriteGame);
router.get('/:id', controller.getGame);
router.get('/', controller.listGames);
router.put('/:id', validateGame, controller.updateGame);
router.delete('/:id', controller.deleteGame);

module.exports = router;
