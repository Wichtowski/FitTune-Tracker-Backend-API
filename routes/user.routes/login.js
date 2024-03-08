const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/user.controllers/loginUser').logInUser;

router.post('/', loginController);

module.exports = router;