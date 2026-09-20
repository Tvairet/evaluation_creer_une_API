const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true, trim: true },
  boatName: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // "this" pointe le document en cours de validation (création ou save())
        return !this.startDate || value > this.startDate;
      },
      message: 'La date de fin doit être postérieure à la date de début'
    }
  }
},
  { timestamps: true } // ajoute automatiquement createdAt et updatedAt
);

module.exports = mongoose.model('reservation', reservationSchema);
