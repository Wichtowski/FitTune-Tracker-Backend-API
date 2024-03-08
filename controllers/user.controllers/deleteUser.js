const User = require('../../database/models/user.model/User');
const bcrypt = require('bcryptjs');
errorMessage = {
    passwordCheck: 'Password is incorrect.',
    emptyFields: 'Please enter all required fields.',
    userNotFound: 'User not found!',
    confDelete: 'Please confirm deletion.',
};

const deleteUser = async (req, res, next) => {
    const { email, password, confDelete } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ id: 8, message: errorMessage.userNotFound });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck === false) {
            return res.status(400).json({ id: 9, message: errorMessage.passwordCheck });
        }

        if (confDelete === false) {
            return res.status(400).json({ id: 10, message: errorMessage.confDelete });
        }

        const result = await User.deleteOne({ email: email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ id: 11, message: errorMessage.userNotFound });
        }

        res.status(201).json({ message: 'User account deleted successfully' });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while deleting user!', err.message);
    }
};

module.exports = { deleteUser };
