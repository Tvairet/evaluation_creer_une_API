const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

/**
 * Récupère tous les utilisateurs.
 * @returns {Promise<Array<Object>>} La liste de tous les utilisateurs
 */
exports.getAllUsers = () => {
  return User.find();
};

/**
 * Récupère un utilisateur par son identifiant MongoDB.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @returns {Promise<Object|null>} Le document utilisateur trouvé, ou null si aucun ne correspond
 */
exports.getUserById = (id) => {
  return User.findById(id);
};

/**
 * Crée un nouvel utilisateur. Le mot de passe est automatiquement hashé
 * par le hook pre('save') du modèle User.
 * @param {Object} data - Les données de l'utilisateur (nom, email, password, role)
 * @returns {Promise<Object>} Le document utilisateur créé
 * @throws {Error} Si les données ne respectent pas les règles de validation du schéma
 */
exports.createUser = (data) => {
  const user = new User(data);
  return user.save();
};

/**
 * Remplace les informations d'un utilisateur existant.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @param {Object} data - Les nouvelles données de l'utilisateur
 * @returns {Promise<Object|null>} Le document utilisateur mis à jour, ou null si introuvable
 */
exports.updateUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' });
};

/**
 * Modifie partiellement un utilisateur existant.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @param {Object} data - Les champs à modifier
 * @returns {Promise<Object|null>} Le document utilisateur mis à jour, ou null si introuvable
 */
exports.patchUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

/**
 * Supprime un utilisateur.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @returns {Promise<Object|null>} Le document utilisateur supprimé, ou null si introuvable
 */
exports.deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};