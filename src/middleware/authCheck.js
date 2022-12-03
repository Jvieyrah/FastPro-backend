const tokenManager = require('../helpers/tokenManager');
const StructuredError = require( '../errors/StructuredError');

const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new StructuredError('Token must be a valid token', 401);
  }
  const user = tokenManager.verifyToken(token);
  if (!user) {
    throw new StructuredError('Token must be a valid token', 401);
  }
  next();
};

module.exports = authCheck;
