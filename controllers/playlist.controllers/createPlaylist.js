const { Playlist, User, Exercise } = require('../../database/index');
const { Types: { ObjectId } } = require('mongoose');

require('dotenv').config();

errorMessages = {
    emptyFields: 'Please enter all required fields.',
    invalidParameters: 'Invalid parameters',
    playlistExists: 'Playlist already exists',
    databaseError: 'Database error',
    exerciseNotExists: 'Exercise does not exist',
    usernameExists: 'User does not exist',
    detailsInRequest: 'Details should not be included in request.',
    moreThanOneExercise: 'Only one exercise can be added while creating new playlist.'
};

const createPlaylist = async (req, res) => {
    try {
        let i = 0;
        const { username, playlistName, playlistDescription, exercises, unit, creationKey, session } = req.body;
        
        if (!exercises || !username || !creationKey) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (exercises.length > 1) {
            return res.status(400).json({ message: errorMessages.moreThanOneExercise });
        }
        
        const exerciseID = exercises[0].exerciseID;
        if (!ObjectId.isValid(exerciseID) || exerciseID == undefined) {
            return res.status(400).json({ message: errorMessages.exerciseNotExists });
        }

        const exerciseExists = await Exercise.findOne({ _id: exerciseID });
        if (!exerciseExists) {
            return res.status(400).json({ message: errorMessages.exerciseNotExists });
        }

        const usernameExists = await User.findOne({ username: username });
        if (!usernameExists) {
            return res.status(400).json({ message: errorMessages.usernameExists });
        } 
        const usernameID = usernameExists._id;

        if(exercises[1] != undefined) {
            return res.status(400).json({ message: errorMessages.detailsInRequest })
        }

        if (creationKey != process.env.SPECIAL_CREATION_STRING) {
            return res.status(500).json({ message: errorMessages.databaseError });
        }


        // const newPlaylist = await Playlist.create({
        //         playlistName,
        //         usernameID: usernameID,
        //         playlistDescription,
        //         exercises,
        //         unit,
        //     });
        // await newPlaylist.save();
        res.status(201).json({ message: 'Playlist created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:'Error while creating exercise!', error: err.message });
    }
};

module.exports = { createPlaylist };
