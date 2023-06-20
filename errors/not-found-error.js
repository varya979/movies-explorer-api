/* 404
Пользователь, фильм по данному корректному ID не найдены
(поиск пользователя по іd, простановка/снятие лайка, удаление
фильма, изменение профиля несуществующего пользователя) */

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
