const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const regex = /^(https?:\/\/)([\w.||\w\-||\w\/])*/;

const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regex).required(),
    trailerLink: Joi.string().pattern(regex).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  registrationValidation,
  loginValidation,
  updateUserProfileValidation,
  createMovieValidation,
  movieIdValidation,
  regex,
};
