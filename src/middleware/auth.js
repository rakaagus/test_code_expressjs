const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/database')

const Auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Auth Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log("No token provide");
        return res.status(401).json({ message: 'Unauthorized', success: false })
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: 'Forbidden', success: false });
        }
        console.log("Token verified successfully:", user);
        req.user = user;
        next();
    });
}

module.exports = Auth