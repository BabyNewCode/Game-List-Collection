const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const gamesRouter = require('./routes/games');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/games', gamesRouter);

app.get('/api/stats', require('./controllers/gamesController').getStats);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
