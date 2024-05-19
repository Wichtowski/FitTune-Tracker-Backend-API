const express = require('express');
const router = express.Router();
const updateDescription =  require('../../controllers/playlist.controllers/updateDescription').updateDescription;

router.put('/', updateDescription);

module.exports = router;