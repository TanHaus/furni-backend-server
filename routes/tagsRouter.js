const express = require('express');
const router = express.Router();

const tagsHandler = require('../code/handlers/tagsHandler');
const authentication = require('../code/middlewares').authentication;

router.use('/', authentication);
router.post('/', tagsHandler.createTags);
router.get('/', tagsHandler.getTags);

module.exports = router;