const express = require('express');
const router = express.Router();
const createExercise =  require('../../controllers/exercise.controllers/createExercise').createExercise;
const cookieJWT = require('../../middlewares/cookieJWT');

router.post('/', createExercise);

module.exports = router;