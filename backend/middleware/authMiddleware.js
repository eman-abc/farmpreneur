// File: middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('authmiddleware hit');
    next();
};

module.exports = authMiddleware;
