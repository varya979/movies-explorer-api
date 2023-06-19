const BadRequestErrorMessage = 'Переданы некорректные данные';
const NotFoundFilmErrorMessage = 'Фильм по указанному id не найден';
const NotFoundUserErrorMessage = 'Пользователь по указанному id не найден';
const NotFoundRouterErrorMessage = 'Указанный путь не существует';
const ForbiddenErrorMessage = 'Нет прав на удаление фильма';
const FilmRemovedMessage = 'Фильм удален';
const ConflictErrorMessage = 'Такой пользователь уже существует';
const UnauthorizedErrorMessage = 'Неправильные почта или пароль';

module.exports = {
  BadRequestErrorMessage,
  NotFoundFilmErrorMessage,
  NotFoundUserErrorMessage,
  NotFoundRouterErrorMessage,
  ForbiddenErrorMessage,
  FilmRemovedMessage,
  ConflictErrorMessage,
  UnauthorizedErrorMessage,
};
