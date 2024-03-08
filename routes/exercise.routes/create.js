const express = require('express');
const router = express.Router();
const { createExercise, limiter} =  require('../../controllers/exercise.controllers/createExercise');

router.post('/', limiter, createExercise);

module.exports = router;