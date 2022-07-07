const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  AUTHORIZATION_REQUIRED,
} = require('../utils/constants');
const { developJwt } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : developJwt,
    );
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
