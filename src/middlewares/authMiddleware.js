const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, existUser) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.existUser = existUser;
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token is provided
    }
};

module.exports = {authJWT};