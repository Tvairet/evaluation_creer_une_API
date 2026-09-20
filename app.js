const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Charge les variables d'environnement depuis env/.env si elles ne sont pas
// déjà présentes dans process.env. Ça permet au serveur de fonctionner
// que tu lances "npm run dev" (via env-cmd) ou juste "node app.js".
const envPath = path.join(__dirname, 'env', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}


const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const indexRouter = require("./routes/indexRoutes");
const catwayRouter = require('./routes/catwayRoutes');
const authRoutes = require('./routes/authRoutes');

// Déclaration du moteur de template et du dossier des views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à MongoDB (Atlas en production via MONGO_URI, localhost par défaut en développement)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/api_port_russel';
mongoose.connect(MONGO_URI)
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB :', err));

// Middlewares
app.use(express.json()); // Middleware pour lire le JSON body (API)
app.use(express.urlencoded({ extended: true })); // Middleware pour lire les formulaires HTML
app.use(cookieParser()); // Middleware pour lire les cookies (dont le token JWT)

// Exploitation du dossier public pour les fichiers statiques (css, images, etc)
app.use(express.static('public'));

app.use("/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", indexRouter);
app.use("/catways", catwayRouter); // routes API catways citées dans le brief (GET/POST/PUT/DELETE /catways)

// Middleware d'erreur : doit être déclaré en DERNIER, après toutes les routes,
// sinon Express ne l'atteint jamais pour les erreurs survenant dans les routes.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
