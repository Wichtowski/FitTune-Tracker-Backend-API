const Exercise = require('../../database/models/exercise.model/Exercise');
const rateLimit = require("express-rate-limit");
require("dotenv").config();

errorMessages = {
    missingParameters: "Missing parameters",
    invalidParameters: "Invalid parameters",
    exerciseExists: "Exercise already exists",
    databaseError: "Database error"
};

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again later"
});

const createExercise = async (req, res, next) => {
    const { exerciseName, exerciseYtVideoID, exerciseMuscleGroup, exerciseEquipment, exerciseDifficulty, creationKey} = req.body;
    
    const uniqueExercise = await Exercise.findOne({ exerciseName: exerciseName });
    if (uniqueExercise) {
        return res.status(400).json({ id: 12, message: errorMessages.exerciseExists });
    }
    if (!exerciseName || !exerciseYtVideoID || !exerciseMuscleGroup || !exerciseEquipment || !exerciseDifficulty) {
        return res.status(400).json({ id: 13, message: errorMessages.missingParameters });
    }
    
    if (exerciseName.length < 1 || exerciseYtVideoID.length < 1 || exerciseMuscleGroup.length < 1 || exerciseEquipment.length < 1 || exerciseDifficulty.length < 1) {
        return res.status(400).json({ id: 14, message: errorMessages.invalidParameters });
    }

    if (creationKey != process.env.SPECIAL_CREATION_STRING ) {
        return res.status(500).json({ id: 15, message: errorMessages.databaseError });
    }

    try {
        const exercise = await Exercise.create({
            exerciseName: exerciseName,
            exerciseYtVideoID: exerciseYtVideoID,
            exerciseMuscleGroup: exerciseMuscleGroup,
            exerciseEquipment: exerciseEquipment,
            exerciseDifficulty: exerciseDifficulty
        });
        await exercise.save();
        res.status(201).json({ message: 'Exercise created successfully' });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while creating exercise!', error: err.message});
    }
}

module.exports = { createExercise, limiter };