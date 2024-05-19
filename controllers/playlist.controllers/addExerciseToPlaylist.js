const { isValid, ObjectId } = require('mongoose').Types;
const { Playlist, Exercise, User } = require('../../database/index');
const successMessages = require('../../helpers/successMessages');
const errorMessages = require('../../helpers/errorMessages');

const addExerciseToPlaylist = async (req, res) => {
    const { playlistID, exerciseID, userID, token } = req.body;
    try {
        if (!playlistID || !exerciseID || !userID) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (!ObjectId.isValid(exerciseID) || !ObjectId.isValid(playlistID) || !ObjectId.isValid(userID)) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }

        const user = await User.findOne({ _id: userID });
        if (!user) {
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
        const newID = new ObjectId();

        await Playlist.updateOne({ _id: playlistID }, { $push: { exercises: { _id: newID, exerciseID: exerciseExists._id } } });

        res.status(201).json({ message: successMessages.exerciseAddedToPlaylist });
    } catch (err) {
        res.status(500).json({ message: errorMessages.exerciseAddingError, error: err.message });
    }
};

module.exports = { addExerciseToPlaylist };
