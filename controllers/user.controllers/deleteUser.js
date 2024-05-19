const User = require('../../database/models/user.model/User');
const bcrypt = require('bcryptjs');
const errorMessages = require('../../helpers/errorMessages');
const successMessages = require('../../helpers/successMessages');


const deleteUser = async (req, res, next) => {
    const { email, password, confDelete } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({  message: errorMessages.userNotFound });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck === false) {
            return res.status(400).json({ message: errorMessages.passwordCheck });
        }

        if (confDelete === false) {
            return res.status(400).json({ message: errorMessages.confDelete });
        }

        const result = await User.deleteOne({ email: email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: errorMessages.userNotFound });
        }

        res.status(201).json({ message: successMessages.userDeleted });
        next();
    } catch (err) {
        res.status(500).json({ message: `${ new Date() }\n`, error: err });
    }
};

module.exports = { deleteUser };
