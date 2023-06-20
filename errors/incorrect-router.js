const NotFoundError = require('./not-found-error');
const { NotFoundRouterErrorMessage } = require('../constants/constants');

const incorrectRouter = (req, res, next) => {
  next(new NotFoundError(NotFoundRouterErrorMessage)); // 404
};

module.exports = incorrectRouter;
