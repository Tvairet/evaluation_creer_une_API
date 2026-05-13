const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/', catwayController.getAllCatways);
router.post('/', catwayController.createCatway);
router.get('/:id', catwayController.getCatwayById);
router.put('/:id', catwayController.updateCatway);
router.patch('/:id', catwayController.patchCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;