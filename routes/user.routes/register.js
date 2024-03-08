const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/user.controllers/registerUser').handleNewUser;

router.post('/', registerController);

module.exports = router;
