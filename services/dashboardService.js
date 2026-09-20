const Catways = require('../models/catwayModel');

/**
 * Affiche la page du tableau de bord (coquille HTML). Les données
 * (utilisateurs, catways, réservations) sont chargées côté navigateur
 * via fetch() vers l'API (voir le script dans views/dashboard.ejs).
 * @param {import('express').Request} req - La requête Express (req.decoded est rempli par checkJWT)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>}
 */
exports.dashboard = async (req, res) => {
  return res.render('dashboard', {
    title: 'Tableau de bord',
    today: new Date(),
    connectedUser: req.decoded ? req.decoded.user : null
  });
};

/**
 * Supprime un catway depuis la page de liste des catways (/catways),
 * puis redirige vers cette même page.
 * @param {import('express').Request} req - La requête Express (req.params.id = id du catway)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>}
 */
exports.deleteCatway = async (req, res) => {
  try {
    const deleted = await Catways.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).render('message', { message: 'Catway introuvable' });
    }
    return res.redirect('/catways');
  } catch (error) {
    return res.status(500).render('message', {
      message: `Erreur lors de la suppression : ${error.message}`
    });
  }
};