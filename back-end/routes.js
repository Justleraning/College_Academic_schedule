const express = require('express');
const router = express.Router();
const { sendEmailConfirmation } = require('./emailController');

router.post('/emailconfirmation', sendEmailConfirmation);

module.exports = router;
