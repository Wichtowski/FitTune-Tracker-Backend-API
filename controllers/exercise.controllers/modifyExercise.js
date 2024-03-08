const Exercise = require('../../database/models/exercise.model/Exercise');

errorMessages = {
    missingParameters: "Missing parameters",
    invalidParameters: "Invalid parameters",
    exerciseExists: "Exercise already exists",
    databaseError: "Database error"
};

const modifyExercise = async (req, res, next) => {
    const { exerciseName, exerciseYtVideoID, exerciseMuscleGroup, exerciseEquipment, exerciseDifficulty, exerciseCreationKey} = req.body;
    
    const exerciseExists = await Exercise.findOne({ exerciseName: exerciseName });
    if (!exerciseExists) {
        return res.status(404).json({ id: 16, message: errorMessages.exerciseExists });
    }

    if (!exerciseName || !exerciseYtVideoID || !exerciseMuscleGroup || !exerciseEquipment || !exerciseDifficulty) {
        return res.status(400).json({ id: 17, message: errorMessages.missingParameters });
    }
    
    if (exerciseName.length < 1 || exerciseYtVideoID.length < 1 || exerciseMuscleGroup.length < 1 || exerciseEquipment.length < 1 || exerciseDifficulty.length < 1) {
        return res.status(400).json({ id: 18, message: errorMessages.invalidParameters });
    }

    if ( exerciseCreationKey != process.env.SPECIAL_CREATION_STRING ) {
        return res.status(500).json({ id: 19, message: errorMessages.databaseError });
    }

    try {
        const exercise = await Exercise.findOneAndUpdate({ exerciseName: exerciseName }, {
            exerciseYtVideoID: exerciseYtVideoID,
            exerciseMuscleGroup: exerciseMuscleGroup,
            exerciseEquipment: exerciseEquipment,
            exerciseDifficulty: exerciseDifficulty
        });
        res.status(201).json({ message: 'Exercise modified successfully' });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while modifying exercise!', err.message);
    }
}

module.exports = { modifyExercise };