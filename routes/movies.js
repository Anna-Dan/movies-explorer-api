const movieRouter = require('express').Router();
const {
  createMovieValidation,
  movieIdValidation,
} = require('../middlewares/validations');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovieValidation, createMovie);
movieRouter.delete('/movies/:_id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
