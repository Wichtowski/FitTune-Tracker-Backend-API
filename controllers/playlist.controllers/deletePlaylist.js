const { Playlist } = require('../../database/index');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');

const deletePlaylist = async (req, res) => {
    try {
        const { playlistID, userID } = req.body;

        if (!playlistID || !userID || !deletionKey) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        const playlist = await Playlist.findById(playlistID);
        if (!playlist) {
            return res.status(404).json({ message: errorMessages.playlistNotFound });
        }

        if (playlist.userID.toString() !== userID) {
            return res.status(403).json({ message: errorMessages.unauthorized });
        }

        await Playlist.findByIdAndDelete(playlistID);

        return res.status(200).json({ message: successMessages.playlistDeleted });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: errorMessages.playlistDeletingError, error: err.message });
    }
};

module.exports = { deletePlaylist };
