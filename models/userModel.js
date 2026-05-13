const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // pour le chiffrage du mot de passe

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
}, 
  {timestamps: true} // ➜ ajoute automatiquement createdAt et updatedAt}
);

// Hash le mot de passe
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);