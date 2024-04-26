const express = require('express');
const router = express.Router();
const editExercise  =  require('../../controllers/exercise.controllers/editExercise').editExercise;

router.post('/', editExercise);

module.exports = router;