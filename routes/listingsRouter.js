const express = require('express');
const router = express.Router();

const listingsHandler = require('../code/handlers/listingsHandler');
const offersHandler = require('../code/handlers/offersHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/', authentication);
router.post('/', listingsHandler.createListing);
router.post('/:listingId/offers', offersHandler.createOffer);
router.get('/:listingId/offers', offersHandler.getOffersByListing);
router.get('/:listingId', listingsHandler.getListing);
router.get('/', listingsHandler.getListings);
router.put('/:listingId', listingsHandler.editListing);
router.delete('/:listingId', listingsHandler.deleteListing);

module.exports = router;