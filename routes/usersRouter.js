const express = require('express');
const router = express.Router();

const usersHandler = require('../code/handlers/usersHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/:id', authentication);
router.get('/:id/listings', usersHandler.getUserListings);
router.get('/:id/preferences', usersHandler.getUserPreferences);
router.put('/:id/preferences', usersHandler.editUserPreferences);
router.get('/:id', usersHandler.getUser);
router.put('/:id', usersHandler.editUser);
router.delete('/:id', usersHandler.deleteUser);
router.post('/', usersHandler.createUser);

module.exports = router;