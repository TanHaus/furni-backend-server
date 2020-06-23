const express = require('express');
const router = express.Router();

const offersHandler = require('../code/handlers/offersHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/', authentication);
router.post('/', offersHandler.createOffer);
router.get('/:offerId', offersHandler.getOffer);
router.put('/:offerId', offersHandler.editOffer);
router.delete('/:offerId', offersHandler.deleteOffer);

module.exports = router;