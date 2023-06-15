const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// const { createMovieValidation, movieIdValidation } = require('../middlewares/celebrate-validation');

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovies);
// создаёт фильм с переданными в теле: country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
movieRouter.post('/', /* createMovieValidation,*/ createMovie);

movieRouter.delete('/:movieId', /* movieIdValidation, */ deleteMovie);

module.exports = movieRouter;
