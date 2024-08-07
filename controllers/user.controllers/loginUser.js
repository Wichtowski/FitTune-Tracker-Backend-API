const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const User = require('../../database/models/user.model/User');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');
const signJWT = require('../../middlewares/signJWT');
require('dotenv').config();

const logInUser = async (req, res, next) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
        if (!login || !password) {
            return res.status(400).json({ error: errorMessages.emptyFields });
        }
        if (!user) {
            return res.status(404).json({ error: errorMessages.userNotFound });
        }
        const currentDate = dayjs();
        const lastLogin = dayjs(user.sessions.slice(-1)[0].loginDate);
        const dateDiff = currentDate.diff(lastLogin, 'minute');
        console.log(dateDiff);
        if (dateDiff >= 30) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: errorMessages.passwordCheck });
            }
            const token = await signJWT({ user: { username: user.username } }, process.env.ACCESS_TOKEN_SECRET);

            user.sessions.push({
                token: token,
                loginDate: new Date(),
            });
            await user.save();

            res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
            res.status(200).json({ message: successMessages.userLogged, token: token });
        } else {
            return res.status(200).json({ message: successMessages.userAlreadyLogged, token: lastLogin });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: `${new Date()} ${errorMessages.exerciseCreatingError}`, error: err.message });
    }
};

module.exports = { logInUser };
