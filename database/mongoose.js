const { default: mongoose } = require("mongoose");
require('dotenv').config();

class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose
            .connect(`${ process.env.CONNECTION_URI }`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Error while attempting to connect to MongoDB:\n', err.message);
            });
    }
}

module.exports = new Database;
