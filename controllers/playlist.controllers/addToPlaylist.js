const { Playlist, Exercise, User } = require('../../database/index');
const {  Types: { ObjectId } } = require('mongoose');

const successMessages = require('../../helpers/successMessages');
const errorMessages = require('../../helpers/errorMessages');

const addExerciseToPlaylist = async (req, res) => {
    const { playlistID, exerciseID, usernameID } = req.body;
    try {
        if (!playlistID || !exerciseID || !usernameID) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (!ObjectId.isValid(exerciseID) || !ObjectId.isValid(playlistID) || !ObjectId.isValid(usernameID)) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        const usernameExists = await User.findOne({ _id: usernameID });
        if (!usernameExists) {
            return res.status(404).json({ message: errorMessages.userNotFound });
        }

        const playlistExists = await Playlist.findOne({ _id: playlistID });
        if (!playlistExists) {
            return res.status(404).json({ message: errorMessages.playlistNotExists });
        }

        const exerciseExists = await Exercise.findOne({ _id: exerciseID });
        if (!exerciseExists) {
            return res.status(404).json({ message: errorMessages.exerciseNotExists });
        }

        const exercise = await Exercise.findOne({ _id: exerciseID });

        await Playlist.updateOne({ _id: playlistID }, { $push: { exercises: exercise } });

        res.status(201).json({ message: successMessages.exerciseAddedToPlaylist });
    } catch (err) {
        res.status(500).json({ message: `${new Date()} ${errorMessages.exerciseAddingError}`, error: err.message });
    }
};

module.exports = { addExerciseToPlaylist };
