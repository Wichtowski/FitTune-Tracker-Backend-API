const express = require('express');
const router = express.Router();
const createPlaylist =  require('../../controllers/playlist.controllers/createPlaylist').createPlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', createPlaylist);

module.exports = router;