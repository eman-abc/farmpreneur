const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // If the user is authenticated, set the user in the request object
    req.user = req.session.user;
    
    console.log('authmiddleware hit'); // Log when middleware is executed
    next();  // Continue to the next middleware/route
};

module.exports = authMiddleware;
