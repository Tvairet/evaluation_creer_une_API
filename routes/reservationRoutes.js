const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const checkJWT = require('../middlewares/private');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           example: 1
 *         clientName:
 *           type: string
 *           example: Jean Dupont
 *         boatName:
 *           type: string
 *           example: Le Petit Mousse
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations de catways
 */

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Liste toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get('/', reservationController.getAllReservations);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crée une réservation (utilisateur connecté)
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Données invalides (ex. date de fin antérieure à la date de début)
 *       401:
 *         description: Non authentifié
 */
router.post('/', checkJWT, reservationController.createReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Récupère une réservation par son id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La réservation demandée
 *       404:
 *         description: Réservation introuvable
 */
router.get('/:id', reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Modifie une réservation (admin uniquement)
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Réservation introuvable
 */
router.put('/:id', checkJWT, requireAdmin, reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   patch:
 *     summary: Modifie partiellement une réservation (admin uniquement)
 *     tags: [Reservations]
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
 *         description: Réservation modifiée
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Réservation introuvable
 */
router.patch('/:id', checkJWT, requireAdmin, reservationController.patchReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprime une réservation (admin uniquement)
 *     tags: [Reservations]
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
 *         description: Réservation supprimée
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Réservation introuvable
 */
router.delete('/:id', checkJWT, requireAdmin, reservationController.deleteReservation);

module.exports = router;