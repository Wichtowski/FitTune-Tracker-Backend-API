const express = require('express');
const router = express.Router();
const deleteExerciseFromPlaylist = require('../../controllers/playlist.controllers/deleteExerciseFromPlaylist').deleteExerciseFromPlaylist;
const cookieJWT = require('../../middlewares/cookieJWT');

router.delete('/', deleteExerciseFromPlaylist);

module.exports = router;