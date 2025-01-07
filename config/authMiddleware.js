const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.key);
        req.user = decoded; // Add user info to the request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
