const jwt = require('jsonwebtoken');

// Middleware to verify token and extract user ID
const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming token is in the cookies
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.id; // Add user ID to request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
