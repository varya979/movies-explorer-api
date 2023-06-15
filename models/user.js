const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    // почта пользователя, по которой он регистрируется
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный адрес электронной почты',
      },
    },
    // хеш пароля
    password: {
      type: String,
      required: true,
      select: false, // по умолчанию хеш пароля не будет возвращаться из базы
    },
    // имя пользователя
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false }, /* чтобы убрать поле __v (версию документа)
  из объекта(наглядно - в постмане) */
);

// сделаем код проверки почты и пароля частью схемы User:
// добавим метод findUserByCredentials схеме пользователя.
// у него будет два параметра — почта и пароль

// userSchema.statics.findUserByCredentials = function (email, password) {
//   // попытаемся найти пользователя по почте
//   return this.findOne({ email }).select('+password')
//   // this — это модель User
//     .then((user) => {
//       // не нашёлся — отклоняем промис
//       if (!user) {
//         return Promise.reject(new UnauthorizedError('Неправильные почта или пароль')); // 401
//       }

//       // нашёлся — сравниваем хеши
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) { // отклоняем промис
//             return Promise.reject(new UnauthorizedError('Неправильные почта или пароль')); // 401
//           }

//           return user; // теперь user доступен
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
