const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const catwayService = require('../services/catwayService');
const checkJWT = require('../middlewares/private');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           example: 1
 *         catwayType:
 *           type: string
 *           enum: [long, short]
 *         catwayState:
 *           type: string
 *           example: Bon état
 */

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways (appontements)
 */

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 */
router.get('/', catwayController.getAllCatways);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Crée un catway (admin uniquement)
 *     tags: [Catways]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.post('/', checkJWT, requireAdmin, catwayController.createCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Récupère un catway par son id
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Le catway demandé
 *       404:
 *         description: Catway introuvable
 */
router.get('/:id', catwayController.getCatwayById);

/**
 * @swagger
 * /api/catways/{id}:
 *   put:
 *     summary: Modifie l'état d'un catway (admin uniquement)
 *     tags: [Catways]
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
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway modifié
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Catway introuvable
 */
router.put('/:id', checkJWT, requireAdmin, catwayController.updateCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   patch:
 *     summary: Modifie partiellement un catway (admin uniquement)
 *     tags: [Catways]
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
 *         description: Catway modifié
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Catway introuvable
 */
router.patch('/:id', checkJWT, requireAdmin, catwayController.patchCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprime un catway (admin uniquement)
 *     tags: [Catways]
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
 *         description: Catway supprimé
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Catway introuvable
 */
router.delete('/:id', checkJWT, requireAdmin, catwayController.deleteCatway);

module.exports = router;