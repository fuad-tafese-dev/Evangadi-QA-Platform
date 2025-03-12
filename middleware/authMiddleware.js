const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Check the decoded token structure
        req.user = { userId: decoded.userId }; // Pass userId from decoded token
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
