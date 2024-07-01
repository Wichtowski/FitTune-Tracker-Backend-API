const { ObjectId } = require('mongoose').Types;
const { Playlist, Exercise, User } = require('../../database/index');
const successMessages = require('../../helpers/successMessages');
const errorMessages = require('../../helpers/errorMessages');

const addExercisesToPlaylist = async (req, res) => {
    const { playlistID, exerciseIDs, userID } = req.body;

    try {
        if (!playlistID || !exerciseIDs || !userID) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (!Array.isArray(exerciseIDs) || exerciseIDs.length === 0) {
            return res.status(400).json({ message: errorMessages.invalidIDsOrEmptyArray });
        }

        if (!ObjectId.isValid(playlistID) || !ObjectId.isValid(userID)) {
            return res.status(400).json({ message: errorMessages.invalidObjectID });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: errorMessages.userNotFound });
        }

        const playlistExists = await Playlist.findById(playlistID);
        if (!playlistExists) {
            return res.status(404).json({ message: errorMessages.playlistNotExists });
        }

        const validExercises = [];
        for (const exerciseID of exerciseIDs) {
            if (!ObjectId.isValid(exerciseID)) {
                return res.status(400).json({ message: errorMessages.invalidExerciseID });
            }

            const exerciseExists = await Exercise.findById(exerciseID);
            if (!exerciseExists) {
                return res.status(404).json({ message: `${errorMessages.exerciseNotExists}: ${exerciseID}` });
            }

            validExercises.push({ _id: new ObjectId(), exerciseID: exerciseExists._id });
        }

        await Playlist.updateOne(
            { _id: playlistID },
            { $push: { exercises: { $each: validExercises } } }
        );

        res.status(201).json({ message: successMessages.exerciseAddedToPlaylist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessages.exerciseAddingError, error: err.message });
    }
};

module.exports = { addExercisesToPlaylist };
