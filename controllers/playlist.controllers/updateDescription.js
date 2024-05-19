const Playlist = require('../../database/models/playlist.model');
const User = require('../../database/models/user.model');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');

const updateDescription = async (req, res) => {
    const { userID, playlistID, newPlaylistDescription } = req.body;
    try {
        if (!userID || !playlistID || !newPlaylistDescription) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        const userExists = await User.findOne({ _id: userID });
        if (!userExists) {
            return res.status(404).json({ message: errorMessages.userExists });
        }

        const playlistExists = await Playlist.findOne({ _id: playlistID, usernameID: userID });
        if (!playlistExists) {
            return res.status(404).json({ message: errorMessages.playlistNotExists });
        }

        const updatedPlaylist = await Playlist.findOneAndUpdate(
            { _id: playlistID, usernameID: userID },
            { $set: { playlistDescription: newPlaylistDescription } },
            { new: true }
        );
        if (!updatedPlaylist) {
            return res.status(404).json({ message: errorMessages.playlistUpdateError });
        }

        res.status(200).json({ message: successMessages.playlistDescriptionUpdated });
    }
    catch (err) {
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.playlistEditingError }`, error: err.message });
    }
}

module.exports = { updateDescription };