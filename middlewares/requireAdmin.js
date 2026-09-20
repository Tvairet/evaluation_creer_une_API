/**
 * Middleware de contrôle du rôle : à utiliser APRÈS checkJWT (qui remplit
 * req.decoded). Bloque l'accès si l'utilisateur connecté n'a pas le rôle
 * "admin". Répond en HTML (page message.ejs) pour les requêtes venant du
 * navigateur (formulaires du dashboard), et en JSON pour les appels API.
 */
module.exports = (req, res, next) => {
  if (!req.decoded || !req.decoded.user) {
    if (req.accepts('html')) {
      return res.status(401).render('message', { message: 'Vous devez être connecté.' });
    }
    return res.status(401).json({ message: 'token_required' });
  }

  if (req.decoded.user.role !== 'admin') {
    if (req.accepts('html')) {
      return res.status(403).render('message', { message: 'Accès réservé aux administrateurs.' });
    }
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
  }

  next();
};