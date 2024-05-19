const jwt = require('jsonwebtoken');
const errorMessages = require('../helpers/errorMessages');

const cookieJWT = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    try {
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" }); 
        }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ error: "Forbidden" });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        res.clearCookie('token');
        return res.status(500).json({ error: errorMessages.cookieError });
    }
}

module.exports = cookieJWT;
