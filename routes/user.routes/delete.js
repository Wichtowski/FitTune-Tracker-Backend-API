const express = require('express');
const router = express.Router();
const deleteController = require('../../controllers/user.controllers/deleteUser').deleteUser;

router.delete('/', deleteController);

module.exports = router;
