const express = require('express');
const router = express.Router();
const deletePlaylist =  require('../../controllers/playlist.controllers/deletePlaylist').deletePlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', cookieJWT, deletePlaylist);

module.exports = router;