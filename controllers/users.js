const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { developJwt } = require('../utils/config');
const {
  USER_NOT_FOUND,
  INVALID_DATA_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  INVALID_DATA_UPDATE_PROFILE,
  INVALID_PAS_OR_EMAIL,
} = require('../utils/constants');

// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(user);
    })
    .catch(next);
};

// POST /signup — создать пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }).then(() => res.send({
      name,
      email,
    })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_CREATE_USER));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

// PATCH /users/me — обновить профиль
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((updateUser) => {
      if (!updateUser) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_UPDATE_PROFILE));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

// /POST/signin - проверка логина и пароля
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : developJwt,
        {
          expiresIn: '7d',
        },
      );
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError(INVALID_PAS_OR_EMAIL)));
};
