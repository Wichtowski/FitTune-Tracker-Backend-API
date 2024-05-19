const express = require('express');
const router = express.Router();
const addExerciseToPlaylist = require('../../controllers/playlist.controllers/addExerciseToPlaylist').addExerciseToPlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', /*cookieJWT, */ addExerciseToPlaylist);

module.exports = router;