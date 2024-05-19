const express = require('express');
const router = express.Router();
const updateDescriptionPlaylist = require('../../controllers/playlist.controllers/updateDescriptionPlaylist').updateDescriptionPlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.put('/', updateDescriptionPlaylist);

module.exports = router;