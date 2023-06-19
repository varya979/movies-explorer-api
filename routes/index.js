const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
// const incorrectRouter = require('./errors/incorrect-router');
const { login, registration } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registrationValidation, loginValidation } = require('../middlewares/celebrate-validation');

// роуты не требующие авторизации:
router.post('/signup', registrationValidation, registration);
router.post('/signin', loginValidation, login);
// авторизация для всего приложения:
router.use(auth);
// роуты, которым авторизация нужна:
router.use('/users', userRouter);
router.use('/movies', movieRouter);
// app.use('*', incorrectRouter);
