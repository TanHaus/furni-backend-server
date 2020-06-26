const express = require('express');
const router = express.Router();
const multer = require('multer')

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

const listingsHandler = require('../code/handlers/listingsHandler');
const offersHandler = require('../code/handlers/offersHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/', authentication);
router.post('/', listingsHandler.createListing);
router.post('/:listingId/offers', offersHandler.createOffer);
router.get('/:listingId/offers', offersHandler.getOffersByListing);
router.post('/:listingId/pics', upload.array('photo', 3), listingsHandler.addListingPic);
router.get('/:listingId', listingsHandler.getListing);
router.get('/', listingsHandler.getListings);
router.put('/:listingId', listingsHandler.editListing);
router.delete('/:listingId', listingsHandler.deleteListing);

module.exports = router;