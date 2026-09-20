const Reservation = require('../models/reservationModel');

/**
 * Récupère toutes les réservations.
 * @returns {Promise<Array<Object>>} La liste de toutes les réservations
 */
exports.getAllReservations = () => {
  return Reservation.find();
};

/**
 * Récupère une réservation par son identifiant MongoDB.
 * @param {string} id - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} Le document réservation trouvé, ou null si aucun ne correspond
 */
exports.getReservationById = (id) => {
  return Reservation.findById(id);
};

/**
 * Crée une nouvelle réservation.
 * @param {Object} data - Les données de la réservation (catwayNumber, clientName, boatName, startDate, endDate)
 * @returns {Promise<Object>} Le document réservation créé
 * @throws {Error} Si les données ne respectent pas les règles de validation du schéma
 * (par exemple si endDate n'est pas postérieure à startDate)
 */
exports.createReservation = (data) => {
  const reservation = new Reservation(data);
  return reservation.save();
};

/**
 * Remplace les informations d'une réservation existante.
 * @param {string} id - L'identifiant MongoDB de la réservation
 * @param {Object} data - Les nouvelles données de la réservation
 * @returns {Promise<Object|null>} Le document réservation mis à jour, ou null si introuvable
 */
exports.updateReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' });
};

/**
 * Modifie partiellement une réservation existante.
 * @param {string} id - L'identifiant MongoDB de la réservation
 * @param {Object} data - Les champs à modifier
 * @returns {Promise<Object|null>} Le document réservation mis à jour, ou null si introuvable
 */
exports.patchReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true, context: 'query' });
};

/**
 * Supprime une réservation.
 * @param {string} id - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} Le document réservation supprimé, ou null si introuvable
 */
exports.deleteReservation = (id) => {
  return Reservation.findByIdAndDelete(id);
};