const User = require('../../database/models/user.model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const errorMessage = {
    passwordCheck: 'Password is incorrect.',
    emptyFields: 'Please enter all required fields.',
    userNotFound: 'User not found!',
    generic: 'An error occurred while processing your request. Please try again later.'
};

const logInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: errorMessage.emptyFields });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: errorMessage.userNotFound });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: errorMessage.passwordCheck });
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });

        // Store token in HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });

        // Push token to user's 
        user.sessions.push({
            token: token,
            loginDate: new Date(),
        });
        await user.save();

        res.status(200).json({ message: 'User logged in successfully', token: token });
        next();
    } catch (err) {
        console.error('Error while logging user:', err);
        res.status(500).json({ error: errorMessage.generic });
    }
};

module.exports = { logInUser };
