const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { jwtSecret } = require('../constants/config');
const { UnauthorizedErrorMessage } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError(UnauthorizedErrorMessage)); // 401
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен (прислал именно тот токен, который был выдан ему ранее):
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtSecret);
    // Метод jwt.verify вернёт пейлоуд токена, если тот прошёл проверку
  } catch (err) {
    // отправим ошибку 401, если не получилось
    return next(new UnauthorizedError(UnauthorizedErrorMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
