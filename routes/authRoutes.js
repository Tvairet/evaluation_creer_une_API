const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Connexion et déconnexion
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur et pose un cookie JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       302:
 *         description: Connexion réussie, redirection vers /dashboard
 *       400:
 *         description: Email ou mot de passe manquant
 *       403:
 *         description: Identifiants incorrects
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Déconnecte l'utilisateur (supprime le cookie de session)
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Déconnexion réussie, redirection vers /
 */
router.get('/logout', authController.logout);

module.exports = router;