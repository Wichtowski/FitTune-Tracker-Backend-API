const User = require('../../database/models/user.model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorMessages } = require('../../helpers/errorMessages');
const { successMessages } = require('../../helpers/successMessages');

const handleNewUser = async (req, res, next) => {
    const { username, email, password, confPasswd, name, surname, birthdate } = req.body;
    try {
        const emailDuplicate = await User.findOne({ email }).exec();

        const usernameDuplicate = await User.findOne({ username }).exec();
        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password);

        if (emailDuplicate) {
            return res.status(400).json({ message: errorMessages.emailInUse });
        }

        if (usernameDuplicate) {
            return res.status(400).json({ message: errorMessages.usernameInUse });
        }

        if (!username || !email || !password || !confPasswd) {
            return res.status(400).json({ message: errorMessages.emptyFields });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: errorMessages.passwdLength });
        }

        if (password.toLowerCase() === password) {
            return res.status(400).json({ message: errorMessages.passwdToUpper });
        }

        if (password.toLowerCase().includes(username.toLowerCase())) {
            return res.status(400).json({ message: errorMessages.usernameInPasswd });
        }

        if (!hasSpecialCharacter) {
            return res.status(400).json({ message: errorMessages.specialCharInPasswd });
        }

        if (password != confPasswd) {
            return res.status(400).json({ message: errorMessages.passwdMatch });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });

        const result = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            birthdate: birthdate,
            name: name,
            surname: surname,
            sessions: [{ token: token, loginDate: new Date() }],
        });

        res.status(201).json({ message: successMessages.userCreated 
        });
        next();
    } catch (err) {
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.exerciseCreatingError }`, error: err.message});
    }
};
/*
User.methods.toJSON = function () {
    const User = this;
    const UserObject = User.toObject();

    // return the document except the password and sessions (these shouldn't be made available)
    return _.omit(UserObject, ['password', 'sessions']);
}

User.methods.generateAccessAuthToken = function () {
    const User = this;
    return new Promise((resolve, reject) => {
        // Create the JSON web token and return that
        jwt.sign({ _id: User._id.toHexString() }, process.env.JWT_SECRET, { expiresIn: '15m' }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                reject();
            }
        });
    });
}

User.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');

                return resolve(token);
            }
        });
    });
}

User.methods.createSession = function () {
    let User = this;

    return User.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(User, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
        return refreshToken;
    }).catch((err) => {
        return Promise.reject('Failed to save session to database.\n' + err);
    });
}


// MODEL METHODS (static methods) 
User.statics.getJWTSecret = () => {
    return process.env.JWT_SECRET;
}

User.statics.findByIdAndToken = function (_id, token) {
    // finds user by id and token
    // used in auth middleware (verifySession)

    const User = this;

    return User.findOne({
        _id,
        'sessions.token': token
    });
}


User.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                else {
                    reject();
                }
            })
        })
    })
}

User.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        // has expired
        return true;
    }
}


// MIDDLEWARE 
// Before a user document is saved, this code runs
User.pre('save', function (next) {
    let user = this;
    let costFactor = 10;

    if (user.isModified('password')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});


// HELPER METHODS 
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({ 'token': refreshToken, expiresAt });

        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}
*/

module.exports = { handleNewUser };
