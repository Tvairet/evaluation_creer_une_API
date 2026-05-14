const reservationService = require('../services/reservationService');

//afficher toues les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservation = await reservationService.getAllReservations();
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                message: "Aucune réservation trouvée"
            });
        }
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// afficher la réservation suivant son ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// créer une réservation
exports.createReservation = async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// mise à jour des réservations
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        return res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Afficher le formulaire pré-rempli
exports.renderEditForm = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvé');
    }
    res.render('editReservation', { reservation });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};


exports.patchReservation = async (req, res) => {
    try {
        const reservation = await reservationService.patchReservation(req.params.id, req.body);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// supprimer la réservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(req.params.id);
        if (!reservation)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};