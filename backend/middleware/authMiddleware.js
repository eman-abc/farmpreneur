const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        // If the user is not authenticated, send a 401 Unauthorized status with a custom message
        return res.status(401).json({ message: 'Unauthorized, please log in' });
    }
    
    // If the user is authenticated, set the user in the request object
    req.user = req.session.user;
    console.log('Session in authMiddleware:', req.session);

    console.log('authmiddleware hit'); // Log when middleware is executed
    next();  // Continue to the next middleware/route
};

module.exports = authMiddleware;


