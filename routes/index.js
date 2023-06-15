const userRouter = require('./routes/users');
const movieRouter = require('./routes/cards');
// const incorrectRouter = require('./errors/incorrect-router');
// const { login, registration } = require('./controllers/users');
// const error = require('./middlewares/error-handler');
// const auth = require('./middlewares/auth');
// const { registrationValidation, loginValidation } = require('./middlewares/celebrate-validation');


// роуты не требующие авторизации:
// app.post('/signup', registrationValidation, registration);
// app.post('/signin', loginValidation, login);
// авторизация для всего приложения:
// app.use(auth);
// роуты, которым авторизация нужна:
app.use('/users', userRouter);
app.use('/movies', movieRouter);
// app.use('*', incorrectRouter);