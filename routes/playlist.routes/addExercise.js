const express = require('express');
const router = express.Router();
const addExercisesToPlaylist = require('../../controllers/playlist.controllers/addExercisesToPlaylist').addExercisesToPlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', cookieJWT, addExercisesToPlaylist);

module.exports = router;