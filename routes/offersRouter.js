const express = require('express');
const router = express.Router();

const offersHandler = require('../code/handlers/offersHandler');

router.post('/', offersHandler.createOffer);
router.get('/:id', offersHandler.getOffer);
router.put('/:id', offersHandler.editOffer);
router.delete('/:id', offersHandler.deleteOffer);

module.exports = router;