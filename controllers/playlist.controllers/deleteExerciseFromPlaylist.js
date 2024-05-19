const Playlist = require('../../database/models/playlist.model/Playlist');
const User = require('../../database/models/user.model/User');

const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');

const deleteExerciseFromPlaylist = async (req, res) => {
    const { playlistID, userID, exerciseID } = req.body;
    try {
        if (!exerciseID || !playlistID || !userID) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        const playlistExists = await Playlist.findOne({ _id: playlistID });
        if (!playlistExists) {
            return res.status(404).json({ message: errorMessages.playlistNotExists });
        }

        const userExists = await User.findOne({ _id: userID });
        if (!userExists) {
            return res.status(404).json({ message: errorMessages.userNotExists });
        }
        if (userID != userExists._id) {
            return res.status(404).json({ message: errorMessages.usersDontMatch });
        }

        const exerciseExistsInPlaylist = playlistExists.exercises.some(exercise => exercise._id == exerciseID);
        console.log(exerciseExistsInPlaylist);
        console.log(playlistExists.exercises);
        if (!exerciseExistsInPlaylist) {
            return res.status(404).json({ message: errorMessages.exerciseNotExistsInPlaylist });
        }
        
        await Playlist.updateOne(
            { _id: playlistID, exercises: { exerciseID: exerciseID } },
            { $pull: { exercises: { exerciseID: exerciseID } } }
        );

        res.status(200).json({ message: successMessages.exerciseRemovedFromPlaylist });
    } catch (err) {        
        res.status(500).json({ message: errorMessages.playlistEditingError, error: err.message });
    }
}

module.exports = { deleteExerciseFromPlaylist };