const express = require('express');
const router = express.Router();
const authService = require('../services/login');

router.post('/login', (req, res) => authService.login(req, res)); // route pour login
router.get('/logout', (req, res) => authService.logout(req, res)); // route pour deconnexion

module.exports = router;