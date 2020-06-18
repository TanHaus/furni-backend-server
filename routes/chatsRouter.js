const express = require('express');
const router = express.Router();

const chatsHandler = require('../code/handlers/chatsHandler');
const authentication = require('../code/middlewares').authentication;

// router.use('/', authentication);
router.post('/', chatsHandler.createChatSession);
router.use('/:id', chatsHandler.getChatSession);
// router.get('/', listingsHandler.getListings);
// router.put('/:id', listingsHandler.editListing);
// router.delete('/:id', listingsHandler.deleteListing);

module.exports = router;