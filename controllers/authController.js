const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Authentifie un utilisateur (email + password) et pose un cookie JWT.
 * Redirige vers /dashboard en cas de succès (le formulaire de la page
 * d'accueil poste ici en application/x-www-form-urlencoded).
 * @route POST /auth/login
 * @param {import('express').Request} req - La requête Express (req.body = { email, password })
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} Redirige vers /dashboard, ou 400/403/404/500 selon le cas
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(403).json({ message: 'Identifiants incorrects' });
    }

    const expiresIn = 24 * 60 * 60; // 24h, en secondes
    const token = jwt.sign(
      { user: { id: user._id, email: user.email, nom: user.nom, role: user.role } },
      process.env.SECRET_KEY,
      { expiresIn }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.header('Authorization', 'Bearer ' + token);

    return res.redirect('/dashboard');
  } catch (error) {
    console.error('Erreur authentification :', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * Déconnecte l'utilisateur en supprimant le cookie de session.
 * @route GET /auth/logout
 * @param {import('express').Request} req - La requête Express
 * @param {import('express').Response} res - La réponse Express
 * @returns {void} Redirige vers /
 */
exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
};