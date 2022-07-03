const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  NOT_FOUND_MOVIE,
  INVALID_DATA_CREATE_MOVIE,
  ACCESS_RIGHTS_ERROR,
} = require('../utils/constants');

// GET /movies — возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(
      movies.filter((movie) => movie.owner.toString() === req.user._id),
    ))
    .catch(next);
};

// POST /movies — создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((newMovie) => {
      res.send({ newMovie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_CREATE_MOVIE));
      }
      return next(err);
    });
};

// DELETE /movies/:movieId  — удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  console.log('triggered');
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIE);
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(ACCESS_RIGHTS_ERROR));
      }
      return movie
        .remove()
        .then(() => res.send({ massage: 'Фильм успешно удален' }));
    })
    .catch(next);
};
