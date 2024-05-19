const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const User = require('../../database/models/user.model/User');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');
const signJWT = require('../../middlewares/signJWT');
require("dotenv").config();

const logInUser = async (req, res, next) => {
    const { login, password, jwtRenewal } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
        const format = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
        const lastLogin = dayjs(user.sessions.slice(-1)[0].loginDate).format(format);
        const formattedJwtRenewal = jwtRenewal ? dayjs(jwtRenewal).format(format) : null;
        
        if (formattedJwtRenewal != lastLogin) {
            if (!login || !password) {
                return res.status(400).json({ error: errorMessages.emptyFields });
            }
            if (!user) {
                return res.status(404).json({ error: errorMessages.userNotFound });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: errorMessages.passwordCheck });
            }
        }

        const signedToken = await signJWT({ user: { username: user.username, password: user.password, } }, process.env.ACCESS_TOKEN_SECRET);

        user.sessions.push({
            token: signedToken,
            loginDate: new Date(),
        });
        await user.save();
        
        res.cookie('token', signedToken, { httpOnly: true, maxAge: 30 * 60 * 1000 });
        res.status(200).json({ message: successMessages.userLogged, token: signedToken });
        next();
    } catch (err) {
        res.status(500).json({ message: `${ new Date() } ${ errorMessages.exerciseCreatingError }`, error: err.message });
    }
};

module.exports = { logInUser };
