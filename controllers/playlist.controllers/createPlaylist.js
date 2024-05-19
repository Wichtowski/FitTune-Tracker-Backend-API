const { Playlist, User, Exercise } = require('../../database/index');
const { isValid, ObjectId } = require('mongoose').Types;
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');
require('dotenv').config();


const createPlaylist = async (req, res) => {
    try {
        const { userID, playlistName, playlistDescription, exerciseID, unit, creationKey } = req.body;

        if (!userID || !creationKey) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (creationKey !== process.env.CREATION_STRING) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        const userExists = await User.findById(userID);
        if (!userExists) {
            return res.status(400).json({ message: errorMessages.userNotExists });
        }

        let validExercise = null;
        const newID = new ObjectId();

        if (exerciseID) {
            if (!ObjectId.isValid(exerciseID)) {
                return res.status(400).json({ message: errorMessages.exerciseNotExists });
            }

            validExercise = await Exercise.findById(exerciseID);
            if (!validExercise) {
                return res.status(400).json({ message: errorMessages.exerciseNotExists });
            }
        }

        const newPlaylist = new Playlist({
            playlistName,
            userID,
            playlistDescription,
            exercises: validExercise ? [{ _id: newID, exerciseID }] : [],
            unit,
        });

        await newPlaylist.save();

        return res.status(201).json({ message: successMessages.playlistCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: errorMessages.exerciseCreatingError, error: err.message });
    }
};



module.exports = { createPlaylist };
