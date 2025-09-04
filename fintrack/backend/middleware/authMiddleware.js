const tempAuthMiddleware = (req, res, next) => {
  // WARNING
  // This file is temp and must be replaced after auth feature has been implemented
  // While in production, we have to implement proper JWT-based authentication.
  // Replace with a valid UserId from your users collection
  req.user = {
    id: '60d0fe4f5311236168a109ca' 
  };
  next();
};

module.exports = tempAuthMiddleware;
