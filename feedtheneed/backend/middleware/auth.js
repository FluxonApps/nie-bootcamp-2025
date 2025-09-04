const jwt = require("jsonwebtoken");
const { ROLES, JWT_SECRET } = require("../constants/constant");

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    req.user = decoded || {};
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to check role-based access
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };
