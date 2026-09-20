const express = require('express');
const router = express.Router();

const dashboardService = require('../services/dashboardService');
const checkJWT = require('../middlewares/private');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/dashboard', checkJWT, dashboardService.dashboard);
router.get('/dashboard/deleteCatway/:id', checkJWT, requireAdmin, dashboardService.deleteCatway);

module.exports = router;