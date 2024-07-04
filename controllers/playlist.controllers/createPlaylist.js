const { Playlist, User, Exercise } = require('../../database/index');
const { isValid, ObjectId } = require('mongoose').Types;
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');
require('dotenv').config();


const createPlaylist = async (req, res) => {
    try {
        const { id, userID, playlistName, playlistDescription, exerciseID, unit } = req.body;

        if (!userID || !playlistName) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        const userExists = await User.findById(userID);
        if (!userExists) {
            return res.status(400).json({ message: errorMessages.userNotExists });
        }

        let validExercise = null;
        const newID = new ObjectId();

        if (exerciseID) {
            if (!isValid(exerciseID)) {
                return res.status(400).json({ message: errorMessages.exerciseNotExists });
            }

            validExercise = await Exercise.findById(exerciseID);
            if (!validExercise) {
                return res.status(400).json({ message: errorMessages.exerciseNotExists });
            }
        }
        const playlistId = id || new ObjectId();
        if (!isValid(playlistId)) {
            return res.status(400).json({ message: errorMessages.invalidId });
        }
        if (id && await Playlist.findById(id)) {
            return res.status(400).json({ message: errorMessages.playlistExists });
        }


        const newPlaylist = new Playlist({
            _id: id,
            playlistName,
            userID,
            playlistDescription,
            exercises: validExercise ? [{ _id: newID, exerciseID }] : [],
            unit,
        });

        await newPlaylist.save();

        return res.status(200).json({ message: successMessages.playlistCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: errorMessages.exerciseCreatingError, error: err.message });
    }
};



module.exports = { createPlaylist };
