const express = require('express');
const router = express.Router();

const listingsHandler = require('../code/handlers/listingsHandler');

router.post('/', listingsHandler.createListing);
router.get('/:id', listingsHandler.getListing);
router.get('/', listingsHandler.getListings);
router.put('/:id', listingsHandler.editListing);
router.delete('/:id', listingsHandler.deleteListing);

module.exports = router;