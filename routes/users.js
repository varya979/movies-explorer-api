const userRouter = require('express').Router();

const {
  getMyUser,
  updateUserProfile,
} = require('../controllers/users');

const { updateUserProfileValidation } = require('../middlewares/celebrate-validation');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getMyUser);
// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', updateUserProfileValidation, updateUserProfile);

module.exports = userRouter;
