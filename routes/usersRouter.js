const express = require('express');
const router = express.Router();

const usersHandler = require('../code/handlers/usersHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/:userId', authentication);
router.get('/:userId/listings', usersHandler.getUserListings);
router.get('/:userId/offers', usersHandler.getBuyerOffers);
router.get('/:userId/preferences', usersHandler.getUserPreferences);
router.put('/:userId/preferences', usersHandler.editUserPreferences);
router.get('/:userId', usersHandler.getUser);
router.put('/:userId', usersHandler.editUser);
router.delete('/:userId', usersHandler.deleteUser);
router.post('/', usersHandler.createUser);

module.exports = router;