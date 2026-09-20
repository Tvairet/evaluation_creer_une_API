const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const userService = require('../services/userService');
const userController = require('../controllers/userController');
const catwayController = require('../controllers/catwayController');
const catwayRoutes = require('./catwayRoutes');
const catwayService = require('../services/catwayService');
const reservationController = require('../controllers/reservationController');
const reservationRoutes = require('./reservationRoutes');
const reservationService = require('../services/reservationService');
const dashboardRoutes = require('./dashboardRoutes');
const checkJWT = require('../middlewares/private');
const requireAdmin = require('../middlewares/requireAdmin');

// Page utilisateurs
router.get('/users', checkJWT, requireAdmin, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render('user', { users });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Page d'accueil EJS
router.get('/', async (req, res) => {
  try {
  res.render('index');
} catch (err) {
  res.status(500).send('Erreur serveur');
}
});

// Page Catways
router.get('/catways', async (req, res) => {
  try {
  const catways = await catwayService.getAllCatways();
  res.render('catway', { catways});
} catch (err) {
  res.status(500).send('Erreur serveur');
}
});

// Page réservations
router.get('/reservations', async (req, res) => {
  try {
  const reservations = await reservationService.getAllReservations();
  res.render('reservation', { reservations});
} catch (err) {
  res.status(500).send('Erreur serveur');
}
});

// Routes du tableau de bord (protégées par checkJWT à l'intérieur de dashboardRoutes)
router.use('/', dashboardRoutes);

// Formulaire d'édition
router.get('/users/:id/edit', checkJWT, requireAdmin, userController.renderEditForm);
router.get('/catways/:id/edit', catwayController.renderEditForm);
router.get('/reservations/:id/edit', reservationController.renderEditForm);

router.use('/api/users', userRoutes);
router.use('/api/catways', catwayRoutes);
router.use('/api/reservations', reservationRoutes);


module.exports = router;