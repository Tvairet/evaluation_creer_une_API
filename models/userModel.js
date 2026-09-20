const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // pour le chiffrage du mot de passe

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Adresse email invalide']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
},
  { timestamps: true } // ajoute automatiquement createdAt et updatedAt
);

// Hash le mot de passe avant chaque création/sauvegarde (document.save())
// Hook async : ne pas déclarer/appeler "next", Mongoose attend simplement
// la résolution de la promesse.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Hash le mot de passe aussi pour findOneAndUpdate / findByIdAndUpdate
// (utilisés par userService.updateUser / patchUser, qui ne déclenchent pas 'save')
userSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  const newPassword = update.password || (update.$set && update.$set.password);
  if (!newPassword) {
    return;
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  if (update.password) update.password = hashed;
  if (update.$set && update.$set.password) update.$set.password = hashed;
});

module.exports = mongoose.model('User', userSchema);
