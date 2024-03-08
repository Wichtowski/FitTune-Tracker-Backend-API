const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ error: "Forbidden" });
        }
        req.user = user;
        next();
    });
};

module.exports = verifyJWT;
