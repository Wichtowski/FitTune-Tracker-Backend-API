const User = require('../../database/models/user.model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorMessages = require('../../helpers/errorMessages');
require("dotenv").config();

const logInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: errorMessages.emptyFields });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: errorMessages.userNotFound });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: errorMessages.passwordCheck });
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });

        user.sessions.push({
            token: token,
            loginDate: new Date(),
        });
        await user.save();

        res.status(200).json({ message: 'User logged in successfully', token: token });
        next();
    } catch (err) {
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.exerciseCreatingError }`, error: err });
    }
};

module.exports = { logInUser };
