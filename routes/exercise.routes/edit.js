const express = require('express');
const router = express.Router();
const editExercise  =  require('../../controllers/exercise.controllers/editExercise').editExercise;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', cookieJWT, editExercise);

module.exports = router;