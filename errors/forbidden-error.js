/* 403
Обновление чужого профиля, удаление чужого
фильма - Authorized but Forbidden */

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
