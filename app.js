require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// подключаем логгер запросов
app.use(requestLogger);
// подключаем корневой роутер
app.use(router);

// подключаем логгер ошибок
app.use(errorLogger);
// мидлвэр - обработчик ошибок celebrate
// app.use(errors());
// мидлвэр - центральный обработчик ошибок (должен быть в конце всех app.use):
// app.use(error);

app.listen(PORT);
