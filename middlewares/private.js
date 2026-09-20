const jwt = require('jsonwebtoken');

/**
 * Middleware de protection des routes : vérifie la présence et la validité
 * d'un token JWT (cookie "token" ou header Authorization: Bearer ...).
 * Si le token est valide, rafraîchit le token (glissement de la session)
 * et laisse passer la requête. Sinon, renvoie 401.
 */
module.exports = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  let token = req.cookies && req.cookies.token;

  if (!token && req.headers['authorization']) {
    const header = req.headers['authorization'];
    token = header.startsWith('Bearer ') ? header.slice(7) : header;
  }

  if (!token) {
    return res.status(401).json({ message: 'token_required' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'token_not_valid' });
    }

    req.decoded = decoded;

    // Rafraîchit le token (fait glisser l'expiration) et le renvoie
    // à la fois en cookie (pour les vues) et en header (pour l'API)
    const expiresIn = 24 * 60 * 60; // 24h, en secondes
    const newToken = jwt.sign({ user: decoded.user }, SECRET_KEY, { expiresIn });

    res.cookie('token', newToken, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.header('Authorization', 'Bearer ' + newToken);

    next();
  });
};
