const Playlist = require('../../models/playlist.model');
const User = require('../../models/user.model');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');

const updateName = async (req, res) => {
    const { userID, playlistID, newPlaylistName } = req.body;
    try {
        const userExists = await User.findOne({ _id: userID });
        if (!userExists) {
            return res.status(400).json({ message: errorMessages.userExists });
        }
        const playlistExists = await Playlist.findOne({ _id: playlistID, usernameID: userID });
        if (!playlistExists) {
            return res.status(400).json({ message: errorMessages.playlistNotExists });
        }

        
        playlistExists.playlistName = newPlaylistName;
        await playlistExists.save();
        res.status(200).json({ message: successMessages.playlistNameUpdated });

    }
    catch (err) {
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.playlistEditingError }`, error: err.message });
    }
}

module.exports = { updateName };