const express = require('express');
const router = express.Router();
const getFbData = require('../middleware/facebook.js');
const JWT = require('../middleware/jwt.js');
const TokenController = require('../controllers/token.js')


/* GET home page. */

router.post('/facebook', getFbData, JWT.getJWT, TokenController.tokenToClient)

module.exports = router;
