const authMiddleware = (req, res, next) => {
  console.log('authMiddleware begins');
  console.log('Session User:', req.session.user);  // Check if session is populated
  
  if (req.session && req.session.user) {
      console.log('User authenticated:', req.session.user);
      req.user = req.session.user;  // Attach the user to the request object
      console.log('authMiddleware user attached');
      return next();  // Proceed to the next route handler
  } else {
      console.log('Unauthorized access attempt');
      return res.status(401).json({ message: 'Unauthorized' });  // No session, reject request
  }
};


module.exports = authMiddleware;


