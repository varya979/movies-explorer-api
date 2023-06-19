const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../constants/config');
const {
  BadRequestErrorMessage,
  NotFoundUserErrorMessage,
  ConflictErrorMessage,
} = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

// POST '/signup' - регистрация (создание) пользователя
const registration = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, // записываем хэш в базу
    }))
    .then(() => res.status(201).send({ // 201
      email, name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ConflictErrorMessage)); // 409
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrorMessage)); // 400
      } else {
        next(err); // 500
      }
    });
};

// POST '/signin' - авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      // Методом sign создаем токен. Методу мы передали три аргумента
      const token = jwt.sign(
        { _id: user._id }, // пейлоуд токена (зашифрованный в строку объект пользователя) - id
        NODE_ENV === 'production' ? JWT_SECRET : jwtSecret, // секретный ключ подписи
        { expiresIn: '7d' }, // время, в течение которого токен остаётся действительным
      );
      res.status(200).send({ token });
    })
    // ошибка невалидного логина или пароля обрабатывается в схеме пользователя
    .catch(next); // 401 и 500
};

// GET '/users/me' - возвращает информацию о пользователе (email и имя)
const getMyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(new NotFoundError(NotFoundUserErrorMessage)); // 404
    res.send({ name: user.name, email: user.email });
  } catch (err) {
    next(err); // 500
  }
};

// PATCH '/users/me' - обновляет информацию о пользователе (email и имя)
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        email: req.body.email,
        name: req.body.name,
      },
      { new: true, runValidators: true }, // получим обновлённую и валидную запись
    )
      .orFail(new NotFoundError(NotFoundUserErrorMessage)); // 404
    res.send({ name: user.name, email: user.email });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BadRequestErrorMessage)); // 400
    } else {
      next(err); // 500
    }
  }
};

module.exports = {
  registration,
  login,
  updateUserProfile,
  getMyUser,
};
