const express = require('express');
const router = express.Router();

const { createListing, getListings, getListing, editListing, deleteListing } = require('../code/handlers/listingsHandler');

router.post('/', createListing);
router.get('/:id', getListing);
router.get('/', getListings);
router.put('/:id', editListing);
router.delete('/:id', deleteListing);

module.exports = router;