const catwayService = require('../services/catwayService');

//afficher tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catway = await catwayService.getAllCatways();
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

// afficher le catway suivant son ID
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// créer un catway
exports.createCatway = async (req, res) => {
    try {
        const catway = await catwayService.createCatway(req.body);
        res.status(201).json(catway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// mise à jour des catways
exports.updateCatway = async (req, res) => {
    try {
        const catway = await catwayService.updateCatway(req.params.id, req.body);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        return res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Afficher le formulaire pré-rempli
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


exports.patchCatway = async (req, res) => {
    try {
        const catway = await catwayService.patchCatway(req.params.id, req.body);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// supprimer le catway
exports.deleteCatway = async (req, res) => {
    try {
        const catway = await catwayService.deleteCatway(req.params.id);
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};