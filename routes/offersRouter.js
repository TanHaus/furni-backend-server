const express = require('express');
const router = express.Router();

const { createOffer, getOffer, editOffer, deleteOffer } = require('../code/handlers/offersHandler');

router.post('/', createOffer);
router.get('/:id', getOffer);
router.put('/:id', editOffer);
router.delete('/:id', deleteOffer);

module.exports = router;