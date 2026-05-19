const express = require('express');
const router = express.Router();

const dashboardService = require('../services/dashboardService');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.dashboard);

router.post('/updateUser', private.checkJWT, dashboardService.updateUser);

router.post('/patchUser/:id', private.checkJWT, dashboardService.updateUserById);

router.get('/deleteUser/', private.checkJWT, dashboardService.deleteUser);

router.get('/updateCatway/:id', private.checkJWT, dashboardService.updateCatway);

router.post('/updateCatwayById/:id', private.checkJWT, dashboardService.updateCatwayById);

router.get('/deleteCatway/:id', private.checkJWT, dashboardService.deleteCatway);

router.post('/addReservation', private.checkJWT, dashboardService.addBooking);

router.get('/getReservationById/:id', private.checkJWT, dashboardService.getBookingInfo);

router.get('/deleteReservation/:id', private.checkJWT, dashboardService.deleteBooking);

module.exports = router;

