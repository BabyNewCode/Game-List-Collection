const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../src/server');
const Game = require('../src/models/game');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await Game.deleteMany({});
});

test('Create, list and get a game', async () => {
  const payload = {
    titre: 'Test Game',
    genre: ['Action'],
    plateforme: ['PC'],
    annee_sortie: 2020,
    metacritic_score: 85,
    temps_jeu_heures: 10,
    termine: false
  };

  const res = await request(app).post('/api/games').send(payload);
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('_id');

  const list = await request(app).get('/api/games');
  expect(list.statusCode).toBe(200);
  expect(list.body.length).toBe(1);

  const get = await request(app).get(`/api/games/${res.body._id}`);
  expect(get.statusCode).toBe(200);
  expect(get.body.titre).toBe('Test Game');
});
