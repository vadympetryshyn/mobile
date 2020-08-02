/* eslint-disable no-unused-vars */

import { IntlProvider } from 'react-intl';
import React from 'react';
import configureStore from '../configureStore';

export default function intlFormatMessage(messages, values) {
  const store = configureStore();
  // const locale = store ? store.getState().general.lang : 'ru';
  const locale = 'ru';

  const messagesJson = require(`../translations/${locale}.json`);
  const intlProvider = new IntlProvider(
    { locale, key: locale, defaultLocale: 'ru', messages: messagesJson },
    {},
  );
  const { intl } = intlProvider.state;

  return intl.formatMessage(messages, values);
}
