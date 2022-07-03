const INVALID_DATA_CREATE_MOVIE = 'Переданы некорректные данные при создании фильма';
const ACCESS_RIGHTS_ERROR = 'Нельзя удалить чужой фильм';
const NOT_FOUND_MOVIE = 'Фильм с данным _id не найден';
const EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
const INVALID_DATA_CREATE_USER = 'Переданы некорректные данные при создании пользователя';
const INVALID_DATA_UPDATE_PROFILE = 'Переданы некорректные данные при обновлении профиля';
const USER_NOT_FOUND = 'Пользователь не найден';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const SERVER_ERROR = 'Ошибка сервера';
const INVALID_PAS_OR_EMAIL = 'Неправильные почта или пароль';
const INVALID_EMAIL = 'Некорректный email';
const INVALID_URL_FORMAT = 'Некорректный адрес URL.';
const URL_NOT_FOUND = 'Неправильный адрес запроса';
const PAS_OR_EMAIL_NOT_FOUND = 'Не переданы email или пароль';

module.exports = {
  URL_NOT_FOUND,
  INVALID_URL_FORMAT,
  INVALID_EMAIL,
  INVALID_PAS_OR_EMAIL,
  SERVER_ERROR,
  AUTHORIZATION_REQUIRED,
  USER_NOT_FOUND,
  INVALID_DATA_UPDATE_PROFILE,
  INVALID_DATA_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  NOT_FOUND_MOVIE,
  ACCESS_RIGHTS_ERROR,
  INVALID_DATA_CREATE_MOVIE,
  PAS_OR_EMAIL_NOT_FOUND,
};
