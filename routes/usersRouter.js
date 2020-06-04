const express = require('express');
const router = express.Router();

const { createUser, getUsers, getUser, editUser, deleteUser, getAllListingsByUser } = require('../code/handlers/usersHandler');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.get('/listings', getAllListingsByUser);

module.exports = router;