import { defineMessages } from 'react-intl';

export default defineMessages({
  required: {
    id: 'validation.required',
    defaultMessage:
      'Обязательное поле',
  },
  min: {
    id: 'validation.min',
    defaultMessage:
      'Поле должно содержать минимум {min} символов',
  },
  max: {
    id: 'validation.max',
    defaultMessage:
      'Поле не должно содержать больше {max} символов',
  },
  error: {
    id: 'validation.error',
    defaultMessage:
      'Неправильный формат данных',
  },
  confirmed: {
    id: 'validation.confirmed',
    defaultMessage:
      'Пароль подтверждения не совпадает',
  },
  wrongMail: {
    id: 'validation.wrongMail',
    defaultMessage:
      'Email введен некорректно',
  },
  wrongFormat: {
    id: 'validation.wrongFormat',
    defaultMessage:
      'Неверный формат, или размер файла превышает 2MB',
  },
  fileSize: {
    id: 'validation.fileSize',
    defaultMessage:
      'Файл не должен быть больше чем 2MB',
  },
  firstCapital: {
    id: 'validation.firstCapital',
    defaultMessage:
      '{attribute} должен начинатся с большой буквы',
  },
  fiveUpper: {
    id: 'validation.fiveUpper',
    defaultMessage:
      'В {attribute} слишком много больших букв - макс. 8',
  },
  twoWords: {
    id: 'validation.twoWords',
    defaultMessage:
      'В {attribute} должно быть минимум два слова',
  },
  withCurrency: {
    id: 'validation.withCurrency',
    defaultMessage:
      'В {attribute} должна быть указана валюта',
  },
  vacancyNotSameName: {
    id: 'validation.vacancyNotSameName',
    defaultMessage:
      'Такой {attribute} уже существует',
  },
  unique: {
    id: 'validation.unique',
    defaultMessage:
      'Такой email уже существует',
  },
  firstCapitalVacancy: {
    id: 'validation.firstCapitalVacancy',
    defaultMessage:
      'Название должно начинатся с большой буквы',
  },
  fiveUpperVacancy: {
    id: 'validation.fiveUpperVacancy',
    defaultMessage:
      'В названии слишком много больших букв - макс. 8',
  },
  twoWordsVacancy: {
    id: 'validation.twoWordsVacancy',
    defaultMessage:
      'Введите фамилию',
  },
  vacancyNotSameNameVacancy: {
    id: 'validation.vacancyNotSameNameVacancy',
    defaultMessage:
      'Дублирование вакансий запрещено, для увелечения количества просмотров, вы можете воспользоваться рекламой',
  },
  exists: {
    id: 'validation.exists',
    defaultMessage:
      'Пользователя с таким email не существует!',
  },
  withCurrencyVacancy: {
    id: 'validation.withCurrencyVacancy',
    defaultMessage:
      'Укажите валюту',
  },
  mailNotFound: {
    id: 'validation.mailNotFound',
    defaultMessage:
      'Почта не найдена',
  },
  validMail: {
    id: 'validation.validMail',
    defaultMessage:
      'Вы должны ввести валидный email',
  },
  companyExists: {
    id: 'validation.companyExists',
    defaultMessage:
      'Такая компания уже существует!',
  },
  wrongCurrent: {
    id: 'validation.wrongCurrent',
    defaultMessage:
      'Неверный текущий пароль',
  },
  alreadyUsePhone: {
    id: 'validation.alreadyUsePhone',
    defaultMessage:
      'Этот номер телефона уже используется',
  },
  wrongPassword: {
    id: 'validation.wrongPassword',
    defaultMessage:
      'Неверный пароль',
  },
  youtube: {
    id: 'validation.youtube',
    defaultMessage:
      'Неверный формат ссылки',
  },
});
