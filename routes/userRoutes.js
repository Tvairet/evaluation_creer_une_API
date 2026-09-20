const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const checkJWT = require('../middlewares/private');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           example: Jean Dupont
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *         role:
 *           type: string
 *           enum: [admin, user]
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des comptes utilisateurs (admin uniquement pour l'écriture)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste tous les utilisateurs (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.get('/', checkJWT, requireAdmin, userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un utilisateur (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.post('/', checkJWT, requireAdmin, userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur demandé
 *       404:
 *         description: Utilisateur introuvable
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifie un utilisateur (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Utilisateur introuvable
 */
router.put('/:id', checkJWT, requireAdmin, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Modifie partiellement un utilisateur (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Utilisateur introuvable
 */
router.patch('/:id', checkJWT, requireAdmin, userController.patchUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Utilisateur introuvable
 */
router.delete('/:id', checkJWT, requireAdmin, userController.deleteUser);

module.exports = router;