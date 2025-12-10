# Game Collection API
# Game Collection API

API RESTful pour gérer une collection personnelle de jeux vidéo — rendu TP.

Contenu du dépôt
- `src/` : backend Express + Mongoose
- `client/` : application React (Vite)
- `tests/` : tests Jest + Supertest
- `scripts/testConnection.js` : script pour tester la connexion MongoDB

Pré-requis
- Node.js 18+ et npm
- (Optionnel) Docker si tu veux lancer Mongo localement

Configuration
- Copie `project/.env.example` en `project/.env` et remplis `MONGODB_URI` (ou fournis la variable d'environnement `MONGODB_URI`).
- Si tu laisses le fichier `project/.env` dans le dépôt pour le correcteur, assure-toi que ce sont des identifiants temporaires et indique-le clairement dans le README.

Commandes rapides (PowerShell)
- Installer les dépendances backend :
```powershell
cd project
npm install
```
- Lancer le backend (doit pouvoir lire `MONGODB_URI` depuis `.env`) :
```powershell
npm run dev
```
- Lancer les tests (utilise mongodb-memory-server) :
```powershell
npm test
```
- Lancer le client (dans un autre terminal) :
```powershell
cd project/client
npm install
npm run dev
```

Vérifier la connexion à MongoDB
- Tu peux tester la connexion à l'aide du script fourni :
```powershell
cd project
node scripts/testConnection.js
```
Si le message indique `Connected to MongoDB Atlas successfully`, la connexion est ok.


Support & maintenance
- Tests unitaires/intégration : exécuter `npm test`.
