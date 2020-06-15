const express = require('express');
const router = express.Router();

const loginHandler = require('../code/handlers/loginHandler');

router.post('/refreshToken', loginHandler.handleRefreshToken);
router.delete('/refreshToken', loginHandler.handleDeleteToken);
router.post('/', loginHandler.handleLoginRequest);

module.exports = router;