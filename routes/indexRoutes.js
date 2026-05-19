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
const dashboardRoutes = require('./dashboardRoutes')

// Page utilisateurs
router.get('/users', async (req, res) => {
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

// Formulaire d'édition
router.get('/:id/edit', userController.renderEditForm);
router.get('/catways/:id/edit', catwayController.renderEditForm);
router.get('/reservations/:id/edit', reservationController.renderEditForm);

router.use('/api/users', userRoutes);
router.use('/api/catways', catwayRoutes);
router.use('/api/reservations', reservationRoutes);
router.use('/tableau-de-bord', dashboardRoutes);

module.exports = router;