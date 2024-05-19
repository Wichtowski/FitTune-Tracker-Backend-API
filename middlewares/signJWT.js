const jwt = require('jsonwebtoken');

const signJWT = async (payload, secretKey) => {
    return jwt.sign(payload, secretKey, { expiresIn: '2h' });
}

module.exports = signJWT;
