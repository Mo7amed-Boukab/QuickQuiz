const jwt = require('jsonwebtoken');

const generateToken = (userId, role, email) => {
    return jwt.sign({ userId, role, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        }
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
