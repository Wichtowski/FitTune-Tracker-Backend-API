const db = require('./database/mongoose.js');
const express = require('express'); // Express web server
const cors = require('cors'); // Cross-Origin Resource Sharing
const multer = require('multer'); // File upload
const cookieParser = require('cookie-parser');
// const verifyJWT = require('./middleware/verifyJWT');
// const credentials = require('./middleware/credentials');

const app = express();
const router = express.Router();
const models = require('./database/index.js');

// app.use(credentials);
// app.use(verifyJWT);
app.use(multer().none()); 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes/root'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server starting running on ${ port }`);
});
