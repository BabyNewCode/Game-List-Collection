require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/game_collection_db';
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = { start, app };
