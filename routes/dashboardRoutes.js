const express = require('express');
const router = express.Router();

const dashboardService = require('../services/dashboardService');

const checkJWT = require('../middlewares/private');

router.get('/dashboard', dashboardService.dashboard);

router.post('/updateUser', dashboardService.updateUser);

router.post('/patchUser/:id', dashboardService.patchUser);

router.get('/deleteUser/', dashboardService.deleteUser);

router.get('/updateCatway/:id', dashboardService.updateCatway);

router.post('/updateCatwayById/:id', dashboardService.updateCatwayById);

router.get('/deleteCatway/:id', dashboardService.deleteCatway);

router.post('/dashboard/createReservation', dashboardService.createReservation);

router.get('/getReservationById/:id', dashboardService.getReservationById);

router.get('/deleteReservation/:id', dashboardService.deleteReservation);

module.exports = router;


