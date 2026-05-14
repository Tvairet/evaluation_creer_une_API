const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, 
  {timestamps: true} // ➜ ajoute automatiquement createdAt et updatedAt}
);

module.exports = mongoose.model('reservation', reservationSchema);