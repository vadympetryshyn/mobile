/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
// const { getBrowserLang } = require('./utils/browsers/getBrowserLang');

const uaTranslationMessages = require('./translations/ua.json');
const ruTranslationMessages = require('./translations/ru.json');

// Это самое первое обращение к localStorage
// const getLang = () => {
//   if (window) {
//     // eslint-disable-next-line global-require
//     const { history } = require('./utils/history');
//
//     try {
//       localStorage.getItem(`granatum.lang`);
//     } catch (e) {
//       history.push('/cookies-blocked');
//     }
//   }
// };

// we need this function since we have to provide access to both es5-ony and es6
// environments
// function getDefaultLocale() {
//   if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
//     return 'ru';
//   }
//
//   const browserLang = getBrowserLang() === 'ru' ? 'ru' : 'en';
//
//   return getLang() || browserLang;
// }

const DEFAULT_LOCALE = 'ru';

// prettier-ignore
const appLocales = [
  'ua',
  'ru',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, uaTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  ua: formatTranslationMessages('ua', uaTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
// exports.getLang = getLang;
