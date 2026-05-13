const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService')

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.patch('/:id', userController.patchUser);
router.delete('/:id', userController.deleteUser);

// route d'authentification
router.post('/authentification', userService.authentification);

module.exports = router;