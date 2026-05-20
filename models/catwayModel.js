const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true, unique: true },
  catwayType: { type: String, required: true, lowercase: true, trim: true, enum: ['long', 'short'] },
  catwayState: { type: String, required: true },
  reservable: { type: Boolean, default: true }
}, 
  {timestamps: true} // ➜ ajoute automatiquement createdAt et updatedAt}
);

module.exports = mongoose.model('catway', catwaySchema);