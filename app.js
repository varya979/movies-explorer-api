require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error-handler');
const { mongoAdress } = require('./constants/config');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect(mongoAdress, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// подключаем helmet для установки заголовков, связанных с безопасностью
app.use(helmet());
// подключаем логгер запросов
app.use(requestLogger);
// подключаем rate-limiter
app.use(limiter);
// подключаем корневой роутер
app.use(router);
// подключаем логгер ошибок
app.use(errorLogger);
// мидлвэр - обработчик ошибок celebrate
app.use(errors());
// мидлвэр - центральный обработчик ошибок (должен быть в конце всех app.use):
app.use(error);

app.listen(PORT);
