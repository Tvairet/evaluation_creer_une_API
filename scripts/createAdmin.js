const mongoose = require('mongoose');
const User = require('../models/userModel');

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_NOM = process.env.ADMIN_NOM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGO_URI || !ADMIN_NOM || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Variables manquantes. Fournis MONGO_URI, ADMIN_NOM, ADMIN_EMAIL et ADMIN_PASSWORD.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    const admin = new User({
      nom: ADMIN_NOM,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    });
    await admin.save();
    console.log('Compte admin créé :', admin.email);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erreur :', err.message);
    process.exit(1);
  });