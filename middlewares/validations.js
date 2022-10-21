const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { WRONG_URL_FORMAT } = require('../utils/constants');

const validationUrl = (value) => {
  if (!isURL(value)) {
    throw new Error(WRONG_URL_FORMAT);
  }

  return value;
};

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required(),
    isLiked: Joi.boolean(),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  userIdValidation,
  updateUserValidation,
  createMovieValidation,
  movieIdValidation,
};
