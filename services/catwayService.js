const Catway = require('../models/catwayModel');

/**
 * Récupère tous les catways.
 * @returns {Promise<Array<Object>>} La liste de tous les catways
 */
exports.getAllCatways = () => {
  return Catway.find();
};

/**
 * Récupère un catway par son identifiant MongoDB.
 * @param {string} id - L'identifiant MongoDB du catway
 * @returns {Promise<Object|null>} Le document catway trouvé, ou null si aucun ne correspond
 */
exports.getCatwayById = (id) => {
  return Catway.findById(id);
};

/**
 * Crée un nouveau catway.
 * @param {Object} data - Les données du catway (catwayNumber, catwayType, catwayState)
 * @returns {Promise<Object>} Le document catway créé
 * @throws {Error} Si les données ne respectent pas les règles de validation du schéma
 */
exports.createCatway = (data) => {
  const catway = new Catway(data);
  return catway.save();
};

/**
 * Remplace les informations d'un catway existant.
 * Le numéro et le type du catway ne doivent normalement pas être modifiés
 * (seul l'état l'est en pratique côté formulaire).
 * @param {string} id - L'identifiant MongoDB du catway
 * @param {Object} data - Les nouvelles données du catway
 * @returns {Promise<Object|null>} Le document catway mis à jour, ou null si introuvable
 */
exports.updateCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Modifie partiellement un catway existant.
 * @param {string} id - L'identifiant MongoDB du catway
 * @param {Object} data - Les champs à modifier
 * @returns {Promise<Object|null>} Le document catway mis à jour, ou null si introuvable
 */
exports.patchCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

/**
 * Supprime un catway.
 * @param {string} id - L'identifiant MongoDB du catway
 * @returns {Promise<Object|null>} Le document catway supprimé, ou null si introuvable
 */
exports.deleteCatway = (id) => {
  return Catway.findByIdAndDelete(id);
};