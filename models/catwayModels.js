const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  numéro: { type: Number, required: true, unique: true },
  type: { type: String, required: true, enum: ['long', 'court'] },
  état: { type: String, required: true }
}, 
  {timestamps: true} // ➜ ajoute automatiquement createdAt et updatedAt}
);

module.exports = mongoose.model('catway', catwaySchema);