const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  BadRequestErrorMessage,
  NotFoundFilmErrorMessage,
  ForbiddenErrorMessage,
  FilmRemovedMessage,
} = require('../constants/constants');

// GET '/movies' - возвращает все сохранённые текущим  пользователем фильмы
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err); // 500
  }
};

// POST '/movies' - создаёт фильм с переданными в теле: country, director, duration,
// year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
      thumbnail: req.body.thumbnail,
      movieId: req.body.movieId,
      owner: req.user._id,
    });
    res.status(201).send(movie); // 201
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BadRequestErrorMessage)); // 400
    } else {
      next(err); // 500
    }
  }
};

// DELETE /movies/_id - удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    // если база возвращает пустой объект, то код дальше не выполняется, а переходит в catch
    .orFail(new NotFoundError(NotFoundFilmErrorMessage)) // 404
    .then((movie) => {
      // если поле id пользователя совпадает с полем владельца фильма - фильм удаляем
      if (String(req.user._id) === String(movie.owner)) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({ message: FilmRemovedMessage }))
          .catch(next);
      } else {
        throw new ForbiddenError(ForbiddenErrorMessage); // 403
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestErrorMessage)); // 400
      } else {
        next(err); // 500
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
