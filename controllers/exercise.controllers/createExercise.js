const Exercise = require('../../database/models/exercise.model/Exercise');
const rateLimit = require("express-rate-limit");
const { errorMessages } = require('../../helpers/errorMessages');
const { successMessages } = require('../../helpers/successMessages');
require("dotenv").config();

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again later"
});

const createExercise = async (req, res, next) => {
    const { exerciseName, exerciseYtVideoID, exerciseMuscleGroup, exerciseEquipment, exerciseDifficulty, creationKey} = req.body;
    try {
    
        const uniqueExercise = await Exercise.findOne({ exerciseName: exerciseName });
        if (uniqueExercise) {
            return res.status(400).json({ message: errorMessages.exerciseExists });
        }

        if (!exerciseName || !exerciseYtVideoID || !exerciseMuscleGroup || !exerciseEquipment || !exerciseDifficulty) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (creationKey != process.env.CREATION_STRING ) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        const exercise = await Exercise.create({
            exerciseName: exerciseName,
            exerciseYtVideoID: exerciseYtVideoID,
            exerciseMuscleGroup: exerciseMuscleGroup,
            exerciseEquipment: exerciseEquipment,
            exerciseDifficulty: exerciseDifficulty
        });

        await exercise.save();
        res.status(201).json({ message: successMessages.exerciseCreated });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.exerciseError }`, error: err.message });
    }
}

module.exports = { createExercise, limiter };