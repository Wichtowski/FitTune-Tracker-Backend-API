const Exercise = require('../../database/models/exercise.model/Exercise');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');
require("dotenv").config();

const createExercise = async (req, res) => {
    const { name, ytVideoID, muscleGroup, equipment, difficulty, creationKey} = req.body;
    try {
    
        const uniqueExercise = await Exercise.findOne({ name: name });
        if (uniqueExercise) {
            return res.status(400).json({ message: errorMessages.exerciseExists });
        }

        if (!name || !ytVideoID || !muscleGroup || !equipment || !difficulty) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (creationKey != process.env.CREATION_STRING ) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        await Exercise.create({
            name,
            ytVideoID,
            muscleGroup,
            equipment,
            difficulty
        });

        res.status(201).json({ message: successMessages.exerciseCreated });
    } catch (err) {
        
        res.status(500).json({ message: errorMessages.exerciseError, error: err.message });
    }
}

module.exports = { createExercise };