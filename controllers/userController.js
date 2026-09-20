const userService = require("../services/userService");

/**
 * Liste tous les utilisateurs.
 * @route GET /api/users/
 * @param {import('express').Request} req - La requête Express
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la liste, 404 si vide, 500 en cas d'erreur serveur
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé"
            });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

/**
 * Récupère un utilisateur par son id.
 * @route GET /api/users/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id de l'utilisateur)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + l'utilisateur, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Crée un utilisateur.
 * @route POST /api/users/
 * @param {import('express').Request} req - La requête Express (req.body = { nom, email, password, role })
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 201 + l'utilisateur créé, 400 si les données sont invalides
 */
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Remplace les informations d'un utilisateur.
 * @route PUT /api/users/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + l'utilisateur modifié, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Affiche le formulaire d'édition pré-rempli d'un utilisateur.
 * @route GET /users/:id/edit
 * @param {import('express').Request} req - La requête Express (req.params.id = id de l'utilisateur)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} Rend la vue editUser, ou 404/500 en cas d'erreur
 */
exports.renderEditForm = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.render('editUser', { user });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Modifie partiellement un utilisateur.
 * @route PATCH /api/users/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + l'utilisateur modifié, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.patchUser = async (req, res) => {
    try {
        const user = await userService.patchUser(req.params.id, req.body);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Supprime un utilisateur.
 * @route DELETE /api/users/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id de l'utilisateur)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 204 si supprimé, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};