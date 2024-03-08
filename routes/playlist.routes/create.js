const express = require('express');
const router = express.Router();
const createPlaylist =  require('../../controllers/playlist.controllers/createPlaylist').createPlaylist;

router.post('/', createPlaylist);

module.exports = router;