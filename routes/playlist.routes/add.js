const express = require('express');
const router = express.Router();
const addExerciseToPlaylist = require('../../controllers/playlist.controllers/addToPlaylist').addExerciseToPlaylist;

router.post('/', addExerciseToPlaylist);

module.exports = router;