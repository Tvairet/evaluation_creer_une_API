const reservationService = require('../services/reservationService');

/**
 * Liste toutes les réservations.
 * @route GET /api/reservations/
 * @param {import('express').Request} req - La requête Express
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la liste, 404 si vide, 500 en cas d'erreur serveur
 */
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                message: "Aucune réservation trouvée"
            });
        }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

/**
 * Récupère une réservation par son id.
 * @route GET /api/reservations/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id de la réservation)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la réservation, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Crée une réservation.
 * @route POST /api/reservations/
 * @param {import('express').Request} req - La requête Express (req.body = { catwayNumber, clientName, boatName, startDate, endDate })
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 201 + la réservation créée, 400 si les données sont invalides
 * (par exemple si endDate n'est pas postérieure à startDate)
 */
exports.createReservation = async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Remplace les informations d'une réservation.
 * @route PUT /api/reservations/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la réservation modifiée, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        return res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Affiche le formulaire d'édition pré-rempli d'une réservation.
 * @route GET /reservations/:id/edit
 * @param {import('express').Request} req - La requête Express (req.params.id = id de la réservation)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} Rend la vue editReservation, ou 404/500 en cas d'erreur
 */
exports.renderEditForm = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }
    res.render('editReservation', { reservation });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Modifie partiellement une réservation.
 * @route PATCH /api/reservations/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la réservation modifiée, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.patchReservation = async (req, res) => {
    try {
        const reservation = await reservationService.patchReservation(req.params.id, req.body);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Supprime une réservation.
 * @route DELETE /api/reservations/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id de la réservation)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 204 si supprimé, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(req.params.id);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};