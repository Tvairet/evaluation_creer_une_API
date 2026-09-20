const catwayService = require('../services/catwayService');

/**
 * Liste tous les catways.
 * @route GET /api/catways/
 * @param {import('express').Request} req - La requête Express
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + la liste, 404 si vide, 500 en cas d'erreur serveur
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        if (!catways || catways.length === 0) {
            return res.status(404).json({
                message: "Aucun catway trouvé"
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

/**
 * Récupère un catway par son id.
 * @route GET /api/catways/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id du catway)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + le catway, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Crée un catway.
 * @route POST /api/catways/
 * @param {import('express').Request} req - La requête Express (req.body = { catwayNumber, catwayType, catwayState })
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 201 + le catway créé, 400 si les données sont invalides
 */
exports.createCatway = async (req, res) => {
    try {
        const catway = await catwayService.createCatway(req.body);
        res.status(201).json(catway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Remplace les informations d'un catway.
 * @route PUT /api/catways/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + le catway modifié, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.updateCatway = async (req, res) => {
    try {
        const catway = await catwayService.updateCatway(req.params.id, req.body);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        return res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Affiche le formulaire d'édition pré-rempli d'un catway.
 * @route GET /catways/:id/edit
 * @param {import('express').Request} req - La requête Express (req.params.id = id du catway)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} Rend la vue editCatway, ou 404/500 en cas d'erreur
 */
exports.renderEditForm = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('editCatway', { catway });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Modifie partiellement un catway.
 * @route PATCH /api/catways/:id
 * @param {import('express').Request} req - La requête Express (req.params.id, req.body)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 200 + le catway modifié, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.patchCatway = async (req, res) => {
    try {
        const catway = await catwayService.patchCatway(req.params.id, req.body);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Supprime un catway.
 * @route DELETE /api/catways/:id
 * @param {import('express').Request} req - La requête Express (req.params.id = id du catway)
 * @param {import('express').Response} res - La réponse Express
 * @returns {Promise<void>} 204 si supprimé, 404 si introuvable, 500 en cas d'erreur serveur
 */
exports.deleteCatway = async (req, res) => {
    try {
        const catway = await catwayService.deleteCatway(req.params.id);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};