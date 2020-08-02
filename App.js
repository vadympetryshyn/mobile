import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './app/i18n';

import { StyleProvider } from 'native-base';
import configureStore from './app/configureStore';

import getTheme from './app/theme/components';
import material from './app/theme/variables/material';
import Routes from './app/Routes';

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="ru" key="ru" messages={translationMessages.ru}>
          <StyleProvider style={getTheme(material)}>
            <Routes />
          </StyleProvider>
        </IntlProvider>
      </Provider>
    );
  }
}
