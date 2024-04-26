const Exercise = require('../../database/models/exercise.model/Exercise');
const { errorMessages } = require('../../helpers/errorMessages');
const { successMessages } = require('../../helpers/successMessages');

require("dotenv").config();

const editExercise = async (req, res, next) => {
    const { exerciseName, exerciseYtVideoID, exerciseMuscleGroup, exerciseEquipment, exerciseDifficulty, exerciseCreationKey } = req.body;
    try {
        const exerciseExists = await Exercise.findOne({ exerciseName: exerciseName });
        if (!exerciseExists) {
            return res.status(404).json({ message: errorMessages.exerciseExists });
        }

        if (!exerciseName || !exerciseYtVideoID || !exerciseMuscleGroup || !exerciseEquipment || !exerciseDifficulty) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (exerciseCreationKey != process.env.CREATION_STRING) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        const modifiedExercise = await Exercise.findOneAndUpdate(
            { exerciseName: exerciseName },
            {
                exerciseYtVideoID: exerciseYtVideoID,
                exerciseMuscleGroup: exerciseMuscleGroup,
                exerciseEquipment: exerciseEquipment,
                exerciseDifficulty: exerciseDifficulty,
            },
        );

        await modifiedExercise.save();
        res.status(201).json({ message: successMessages.exerciseModified });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.exerciseCreatingError }`, error: err.message});
    }
};

module.exports = { editExercise };
