const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

router.get('^/$|/index(.html)?', (req, res) => {
    const filePath = path.join(__dirname, '../../../fitTune/fitTune-Frontend/fitTune-Frontend/src/app/app.component.html');
    res.sendFile(filePath);
});

app.use('/', router);
app.use('/fitTune-api/user/register', require('./user.routes/register'));
app.use('/fitTune-api/user/delete', require('./user.routes/delete'));
app.use('/fitTune-api/user/login', require('./user.routes/login'));

app.use('/fitTune-api/exercise/create', require('./exercise.routes/create'));
app.use('/fitTune-api/exercise/edit', require('./exercise.routes/edit'));

app.use('/fitTune-api/playlist/create', require('./playlist.routes/create'));
// app.use('/fitTune-api/playlist/create/withExercise', require('./playlist.routes/create'));
app.use('/fitTune-api/playlist/addExercise', require('./playlist.routes/add'));
app.use('/fitTune-api/playlist/deleteExercise', require('./playlist.routes/deleteExercise'));
app.use('/fitTune-api/playlist/updateDescriptionPlaylist', require('./playlist.routes/updateDescription'));

module.exports = router;
module.exports = app;