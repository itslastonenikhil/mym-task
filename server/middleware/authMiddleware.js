
function checkAuth(req, res, next) {
    // If the user is authenticated, continue with the next middleware
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  module.exports = { checkAuth };
  